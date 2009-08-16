//= require <oatlib-ui/reference>
//= require <combine>
//= require <each>
//= require <array>
//= require <dom/event/delegate>

o.ui.controller = function () {
	var controller = {};
	o.combine(controller,{
		actions: {},
		get_actions_by_key: function (key) {
			return this.actions[key] !== undefined ? this.actions[key] : (this.actions[key] = []);
		},
		register_actions: function (hash) {
			var that = this;
			o.each(hash,function (fn,key) {
				that.get_actions_by_key(key).push(fn);
			});
		},
		fire: function (key) {
			var args = o.array(arguments);
			args.shift();
			this.get_actions_by_key(key)[o.each](function (action) {
				action.apply(null,args);
			});
		},
		delegate: o.dom.event.delegate({
			test: function (node) {
				return node.getAttribute !== undefined && node.getAttribute('action') !== null;
			},
			action: function (e,oe) {
				var target = oe.delegate_target;
				controller.fire(target.getAttribute('action'),e,oe);
			}
		})
	});
	return controller;
};
