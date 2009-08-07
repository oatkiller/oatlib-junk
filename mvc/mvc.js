//= require <oatlib-ui/reference>
//= require <dom/update>
//= require <each>
//= require <array>
//= require <dom/element>
//= require <dom/event/delegate>
//= require <supplant>
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
	get_view_string = (mvc.get_view_string = function (name) {
		return views[name].innerHTML;
	}),
	get_view = (mvc.get_view = function (name) {

		var matches = [], my_array, obj = {};
		while (my_array = o.supplant_regex.exec(views[name].innerHTML)) {
			matches.push(my_array[1]);
		}
		matches[o.each](function (key) {
			obj[key] = '';
		});
		return populate_view(name,obj);
	}),
	populate_view = (mvc.populate_view = function (name,obj) {
		var view = views[name].cloneNode(true);
		view.innerHTML = view.innerHTML[o.supplant](obj);
		return view;
	}),
	resource = (mvc.resource = o.builder({
		// implementer needs to provide these
		// url: '/cards',
		// name: 'card',
		// token: 'asdf',
		request: o.remote.request,
		get_url_for_id: function (id) {
			return this.url + '/{id}.json'[o.supplant]({id: id});
		},
		get_json_url: function () {
			return this.url + '.json';
		},
		get_token_query_string: function () {
			return 'token=' + this.token;
		},
		add_token_query_string: function (s) {
			return s + (s.length ? '&' : '') + this.get_token_query_string();
		},
		get_token_param_obj: function () {
			return {key: 'token', value: this.token};
		},
		all: function (callback) {
			return this.request({
				url: this.get_json_url(),
				on_success: function (r) {
					callback(o.json.parse(r.responseText)[o.map](o.get_object_property[o.rcurry](name)));
				},
				on_failure: function (r) {
					callback(r);
				}
			});
		},
		get: function (id,callback) {
			return this.request({
				url: this.get_url_for_id(id),
				on_success: function (r) {
					callback(o.json.parse(r.responseText)[name])
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
			return this.request({
				url: this.get_json_url(),
				method: 'post',
				body: this.add_token_query_string(o.remote.query_string(array_of_params)),
				on_complete: callback
			});
		},
		update: function (id,array_of_params,callback) {
			// js doesnt have multiple dispatch
			var args = o.array(arguments), id, array_of_params, callback;
			if (args.length === 3) {
				id = args[0];
				array_of_params = args[1];
				callback = args[2];
			} else {
				id = args[0][o.find](function (param_obj) {
					return param_obj.key === 'card[id]';
				}).value;
				array_of_params = args[0];
				callback = args[1];
			}

			return this.request({
				url: this.get_url_for_id(id),
				method: 'put',
				body: this.add_token_query_string(o.remote.query_string(array_of_params)),
				on_complete: callback
			});
		}
	}));

	o.dom.event.delegate({
		test: function (node) {
			return node.getAttribute !== undefined && node.getAttribute('action') !== null;
		},
		action: function (e,oe) {
			var target = oe.delegate_target;
			mvc.fire(target.getAttribute('action'),e,oe);
		}
	});
	
})();
