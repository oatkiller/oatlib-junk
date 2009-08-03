//= require <oatlib-ui/reference>
//= require <oatlib-ui/drag/drag>
//= require <oatlib-ui/drop/drop>
//= require <dom/has_class_name>

o.ui.drop_helper = function () {
	var draggable = o.dom.has_class_name[o.rcurry]('draggable'),
	droppable = o.dom.has_class_name[o.rcurry]('droppable'),
	event = o.application_event(),
	my_event = o.application_event();

	o.ui.drag({
		draggable: draggable,
		event: event
	});

	o.ui.drop({
		drag_event: event,
		event: my_event,
		draggable: draggable,
		droppable: droppable
	});

	return my_event;

};
