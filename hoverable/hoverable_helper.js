//= require <oatlib-ui/reference>
//= require <oatlib-ui/hoverable/hoverable>
//= require <dom/has_class_name>
//= require <dom/add_class_name>
//= require <dom/remove_class_name>
$$_ui_hoverable_helper = $$_ui.hoverable_helper = function () {

	$$_ui_hoverable({
		ancestor: document,
		test: function (n) {
			return $$_dom_has_class_name(n,$hoverable);
		},
		hover: function (n) {
			$$_dom_add_class_name(n,$hover);
		},
		unhover: function (n) {
			$$_dom_remove_class_name(n,$hover);
		}
	});

};
