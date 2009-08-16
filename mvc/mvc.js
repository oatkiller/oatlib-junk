//= require <oatlib-ui/reference>
//= require <each>
//= require <array>
//= require <dom/event/delegate>
//= require <supplant>
(function () {

	var mvc = (o.ui.mvc = {});

	mvc.init = function (view_holder) {
		view_holder = o.dom.remove(view_holder);
		var actions = (mvc.actions = {}),
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
	};
})();
