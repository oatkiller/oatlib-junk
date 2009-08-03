//= require <oatlib-ui/reference>
//= require <oatlib-ui/drag/drag>
//= require <application_event>
//= require <before>
//= require <for_each>
o.ui.drag_helper = function () {

	var my_event = o.application_event();
	return o.ui.drag({
		draggable: function (n) {
			return o.dom.has_class_name(n,'draggable');
		},
		event: my_event
	});

//my_event.multi_subscribe({
//	'on_start_drag': function (data) {
//		console.log('on_start_drag');
//	},
//	'on_drop': function (data) {
//		console.log('on_drop');
//	},
//	'on_updated_position': function (data) {
//		console.log('on_updated_position');
//	}
//});

};
