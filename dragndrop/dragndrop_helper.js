//= require <oatlib-ui/reference>
//= require <oatlib-ui/dragndrop/dragndrop>
($$_ui_dragndrop_helper = $$_ui.dragndrop_helper = function () {

	$$_ui_dragndrop(
		function (n) {
			return $$_dom_has_class_name(n,'draggable');
		},
		function (n) {
			return $$_dom_has_class_name(n,'droppable');
		}
	);

})();
