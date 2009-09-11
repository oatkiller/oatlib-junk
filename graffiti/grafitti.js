//= require <oatlib-ui/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <oatlib-ui/canvas/clear>
//= require <dom/find_position>
//= require <dom/event/add_listener>
//= require <curry>
//= require <call_once>

var ctx = o.ui.canvas.get_context(500,500),
canvas = ctx.canvas,
find_position = o.call_once(o.dom.find_position[o.curry](canvas)),
get_point_from_coordinate = function (coordinate) {
	return {
		x: coordinate.x - find_position().x,
		y: coordinate.y - find_position().y
	};
},
drawing = false,
last_position;

o.dom.event.add_listener(canvas,'mousedown',function (e,oe) {
	o.ui.canvas.clear(ctx);
	drawing = true;
	last_position = get_point_from_coordinate(oe.get_mouse_coordinates());
});
