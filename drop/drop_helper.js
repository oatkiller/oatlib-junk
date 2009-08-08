//= require <oatlib-ui/reference>
//= require <oatlib-ui/drag/drag>
//= require <oatlib-ui/drop/drop>
//= require <dom/has_class_name>

o.ui.drop_helper = function () {
	var draggable = o.dom.has_class_name[o.rcurry]('draggable'),
	droppable = o.dom.has_class_name[o.rcurry]('droppable'),
	drag_event = o.application_event(),
	drop_event = o.application_event();

	o.ui.drag({
		draggable: draggable,
		event: drag_event
	});

	o.ui.drop({
		drag_event: drag_event,
		event: drop_event,
		draggable: draggable,
		droppable: droppable
	});

	return drop_event;

};
