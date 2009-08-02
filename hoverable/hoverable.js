//= require <oatlib-ui/reference>
//= require <dom/event/delegate>
//= require <dom/contains>

o.ui.hoverable = function (data) {
	var hover = data.hover,
	unhover = data.unhover,
	test = data.test;
	o.dom.event.delegate({
		ancestor: data.ancestor,
		type: 'mouseover',
		test: function (n,e,oe) {
			if (test.apply(this,arguments)) {
				return !o.dom.contains(oe.get_target(),oe.get_related_mouseover_target());
			} else {
				return false;
			}
		},
		action: function (e,oe) {
 			if (o.dom.contains(oe.delegate_target,oe.get_target())) {
				return false;
			}
			hover(oe.delegate_target);
		}
	});
	o.dom.event.delegate({
		ancestor: data.ancestor,
		type: 'mouseout',
		test: function (n,e,oe) {
			if (test.apply(this,arguments)) {
				return !o.dom.contains(oe.get_target(),oe.get_related_mouseout_target());
			} else {
				return false;
			}
		},
		action: function (e,oe) {
 			if (o.dom.contains(oe.delegate_target,oe.get_target())) {
				return false;
			}
			unhover(oe.delegate_target);
		}
	});
};
