//= require <oatlib-ui/effects/reference>
//= require <dom/event/delegate>
//= require <dom/has_class_name>
//= require <dom/find_position>
//= require <dom/remove_class_name>
//= require <dom/find_following_sibling_or_self>
//= require <oatlib-ui/effects/tronline>
//= require <oatlib-ui/effects/shrink>
(o.ui.effects.demo = function () {
	o.dom.event.delegate({
		test: function (n) {
			return o.dom.has_class_name(n,'tronline_on_click');
		},
		action: function (e,oe) {
			var target = oe.delegate_target;
			o.ui.effects.tronline(o.dom.find_position(target).rect);
		}
	});

	o.dom.event.delegate({
		test: function (n) {
			return o.dom.has_class_name(n,'shrink');
		},
		action: function (e,oe) {
			o.ui.effects.shrink({
				node: o.dom.find_following_sibling_or_self(oe.delegate_target,function (n) {return o.dom.has_class_name(n,'me');})
			});
		}
	});

	o.dom.event.delegate({
		test: function (n) {
			return o.dom.has_class_name(n,'unshrink');
		},
		action: function (e,oe) {
			o.ui.effects.unshrink({
				node: o.dom.find_following_sibling_or_self(oe.delegate_target,function (n) {return o.dom.has_class_name(n,'me');})
			});
		}
	});
})();
