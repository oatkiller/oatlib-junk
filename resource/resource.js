//= require <oatlib-ui/reference>
//= require <builder>
//= require <supplant>
//= require <remote/request>
//= require <remote/query_string_from_obj>
//= require <json/parse>
//= require <map>
//= require <combine>

o.ui.resource = o.builder({
	// implementer needs to provide these
	
	// url: '/cards',
	// name: 'card',
	// token: 'asdf',

// use this instead of below to test lag
//	request: function () {
//		var that = this, args = o.array(arguments), request, timer = setTimeout(function () {
//			request = o.remote.request.apply(that,args);
//		},2000);
//		return {
//			abort: function () {
//				timer && clearTimeout(timer);
//				request && request.abort;
//			}
//		};
//	},
	request: function (params) {
		this.on_start && this.on_start.apply(this,arguments);

		o.soft_combine(params,{
			on_failure: this.default_on_failure
		});

		var that = this;

		if (this.on_complete || this.on_failure || this.on_success) {
			var old_params = o.combine({},params);
			['on_complete','on_failure','on_success'][o.each](function (on) {
				that[on] && (params[on] = function () {
					that[on].apply(this,arguments);
					return old_params[on].apply(this,arguments);
				});
			}[o.bind](this));
		}

		return o.remote.request(params);

	},
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
				callback && callback(o.json.parse(r.responseText)[o.map](function (obj) {
					return obj[that.name];
				}));
			}
		});
	},
	get: function (id,callback) {
		var that = this;
		return this.request({
			url: this.get_url_for_id(id),
			on_success: function (r) {
				callback && callback(that.get_object_from_response(r));
			}
		});
	},
	destroy: function (id,callback) {
		return this.request({
			url: this.get_url_for_id(id),
			method: 'delete',
			body: this.get_token_query_string()
		});
	},
	create: function (array_of_params,callbacks) {
		var that = this;
		return this.request({
			url: this.get_json_url(),
			method: 'post',
			body: this.add_token_query_string(o.remote.query_string_from_obj(array_of_params)),
			on_success: callbacks && callbacks.on_success && function (r) {
				callbacks.on_success(o.json.parse(r.responseText)[that.name]);
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
				callback && callback(that.get_object_from_response(r));
			}
		});
	}
});
