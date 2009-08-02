//= require <oatlib-ui/reference>
//= require <oatlib-ui/hoverable/hoverable>
//= require <dom/has_class_name>
//= require <dom/add_class_name>
//= require <dom/remove_class_name>
o.ui.hoverable_helper = function () {

	o.ui.hoverable({
		ancestor: document,
		test: function (n) {
			return o.dom.has_class_name(n,'hoverable');
		},
		hover: function (n) {
			o.dom.add_class_name(n,'hover');
		},
		unhover: function (n) {
			o.dom.remove_class_name(n,'hover');
		}
	});

};
