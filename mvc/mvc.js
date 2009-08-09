//= require <oatlib-ui/reference>
//= require <dom/update>
//= require <each>
//= require <array>
//= require <dom/element>
//= require <dom/event/delegate>
//= require <supplant>
//= require <remote/query_string_from_obj>
//= require <remote/request>
//= require <json/parse>
//= require <map>
(function () {

	var mvc = (o.ui.mvc = {}),
	actions = (mvc.actions = {}),
	get_actions_by_key = (mvc.get_actions_by_key = function (key) {
		return actions[key] !== undefined ? actions[key] : (actions[key] = []);
	}),
	register_actions = (mvc.register_actions = function (hash) {
		o.each(hash,function (fn,key) {
			get_actions_by_key(key).push(fn);
		});
	}),
	fire = (mvc.fire = function (key) {
		var args = o.array(arguments);
		args.shift();
		get_actions_by_key(key)[o.each](function (action) {
			action.apply(null,args);
		});
	}),
	view_holder = (mvc.view_holder = o.dom.remove(o.dom.element('views'))),
	get_views = (mvc.get_views = function () {
		var result = {}, view_name;
		o.dom.array(view_holder.childNodes)[o.each](function (node) {
			if (node.getAttribute !== undefined && (view_name = node.getAttribute('view_name'))) {
				result[view_name] = node;
			}
		});
		return result;
	}),
	views = (mvc.views = get_views()),
	get_empty_supplant_object = (mvc.get_empty_supplant_object = function (s) {
		var matches = [], my_array, obj = {};
		while (my_array = o.supplant_regex.exec(s)) {
			matches.push(my_array[1]);
		}
		matches[o.each](function (key) {
			obj[key] = '';
		});
		return obj;
	}),
	populate_view = (mvc.populate_view = function (name,obj) {
		var view = views[name].cloneNode(true),
		tmp = document.createElement('div');
		tmp.appendChild(view);
		obj && (tmp.innerHTML = tmp.innerHTML[o.supplant](obj));
		tmp.innerHTML = tmp.innerHTML[o.supplant](get_empty_supplant_object(tmp.innerHTML));
		return tmp.firstChild;
	}),
	resource = (mvc.resource = o.builder({
		// implementer needs to provide these
		// url: '/cards',
		// name: 'card',
		// token: 'asdf',
//	request: function () {
//		var that = this, args = o.array(arguments), request, timer = window.setTimeout(function () {
//			request = o.remote.request.apply(that,args);
//		},2000);
//		return {
//			abort: function () {
//				timer && window.clearTimeout(timer);
//				request && request.abort;
//			}
//		};
//	},
		request: o.remote.request,
		get_url_for_id: function (id) {
			return this.url + '/{id}.json'[o.supplant]({id: id});
		},
		get_json_url: function () {
			return this.url + '.json';
		},
		get_token_query_string: function () {
			return 'authenticity_token=' + encodeURIComponent(this.token);
		},
		add_token_query_string: function (s) {
			return s + (s.length ? '&' : '') + this.get_token_query_string();
		},
		get_token_param_obj: function () {
			return {key: 'token', value: this.token};
		},
		get_object_from_response: function (r) {
			return o.json.parse(r.responseText)[this.name];
		},
		all: function (callback) {
			var that = this;
			return this.request({
				url: this.get_json_url(),
				on_success: function (r) {
					callback(o.json.parse(r.responseText)[o.map](function (obj) {
						return obj[that.name];
					}));
				},
				on_failure: function (r) {
					callback(r);
				}
			});
		},
		get: function (id,callback) {
			var that = this;
			return this.request({
				url: this.get_url_for_id(id),
				on_success: function (r) {
					callback(that.get_object_from_response(r));
				},
				on_failure: function (r) {
					callback(r);
				}
			});
		},
		destroy: function (id,callback) {
			return this.request({
				url: this.get_url_for_id(id),
				method: 'delete',
				body: this.get_token_query_string(),
				on_complete: callback
			});
		},
		create: function (array_of_params,callback) {
			var that = this;
			return this.request({
				url: this.get_json_url(),
				method: 'post',
				body: this.add_token_query_string(o.remote.query_string_from_obj(array_of_params)),
				on_success: function (r) {
					callback(o.json.parse(r.responseText)[that.name]);
				}
			});
		},
		update: function (id,array_of_params,callback) {
			var that = this;
			return this.request({
				url: this.get_url_for_id(id),
				method: 'put',
				body: this.add_token_query_string(o.remote.query_string_from_obj(array_of_params)),
				on_success: function (r) {
					callback(that.get_object_from_response(r));
				}
			});
		}
	})),
	default_delegate_test = (mvc.default_delegate_test = function (node) {
		return node.getAttribute !== undefined && node.getAttribute('action') !== null;
	}),
	default_delegate_action = (mvc.default_delegate_action = function (e,oe) {
		var target = oe.delegate_target;
		mvc.fire(target.getAttribute('action'),e,oe);
	}),
	default_delegate = (mvc.default_delegate = o.dom.event.delegate({
		test: default_delegate_test,
		action: default_delegate_action
	}));
	
})();
