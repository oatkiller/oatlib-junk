//= require <oatlib-ui/reference>
//= require <dom/update>
//= require <each>
//= require <array>
//= require <dom/element>
//= require <dom/event/delegate>
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
	get_view = (mvc.get_view = function (name) {
		return views[name].cloneNode(true);
	});

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
