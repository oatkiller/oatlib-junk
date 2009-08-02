//= require <oatlib-ui/reference>
//= require <oatlib-ui/dragndrop/dragndrop>
(o.ui.dragndrop_helper = function () {

	var dragdrop = o.ui.dragndrop({
		draggable: function (n) {
			return o.dom.has_class_name(n,'draggable');
		},
		droppable: function (n) {
			return o.dom.has_class_name(n,'droppable');
		}
	});

})();
