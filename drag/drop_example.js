//= require <oatlib-ui/drag/drag>
//= require <oatlib-ui/drag/drop>
//= require <dom/has_class_name>

var draggable = o.dom.has_class_name[o.rcurry]('draggable'),
droppable = o.dom.has_class_name[o.rcurry]('droppable'),
event = o.application_event();

o.ui.drag({
	draggable: draggable,
	event: event
});

o.ui.drop({
	event: event,
	draggable: draggable,
	droppable: droppable
});
