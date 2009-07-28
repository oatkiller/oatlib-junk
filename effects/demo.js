//= require <oatlib-ui/effects/reference>
//= require <dom/event/delegate>
//= require <dom/has_class_name>
//= require <dom/find_position>
//= require <dom/remove_class_name>
//= require <dom/find_following_sibling_or_self>
//= require <oatlib-ui/effects/tronline>
//= require <oatlib-ui/effects/shrink>
($$_ui_effects_demo = $$_ui_effects.demo = function () {
	$$_dom_event_delegate({
		test: function (n) {
			return $$_dom_has_class_name(n,'tronline_on_click');
		},
		action: function (e,oe) {
			var target = oe.delegate_target;
			$$_ui_effects_tronline($$_dom_find_position(target).rect);
		}
	});

	$$_dom_event_delegate({
		test: function (n) {
			return $$_dom_has_class_name(n,'shrink');
		},
		action: function (e,oe) {
			$$_ui_effects_shrink({
				node: $$_dom_find_following_sibling_or_self(oe.delegate_target,function (n) {return $$_dom_has_class_name(n,'me');})
			});
		}
	});

	$$_dom_event_delegate({
		test: function (n) {
			return $$_dom_has_class_name(n,'unshrink');
		},
		action: function (e,oe) {
			$$_ui_effects_unshrink({
				node: $$_dom_find_following_sibling_or_self(oe.delegate_target,function (n) {return $$_dom_has_class_name(n,'me');})
			});
		}
	});
})();
