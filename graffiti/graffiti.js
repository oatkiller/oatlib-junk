//= require <oatlib-ui/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <oatlib-ui/canvas/clear>
//= require <dom/find_position>
//= require <dom/event/add_listener>
//= require <dom/node>
//= require <curry>
//= require <call_once>
//= require <last>

o.store(Array,'min_max',function () {
	if (this.lengh === 0) return;

	var min = this[0],
	max = this[0],
	i,
	length = this.length;

	for (i = 0; i < length; i++) {
		if (this[i] < min) {
			min = this[i];
		} else if (this[i] > max) {
			max = this[i];
		}
	}

	return {min: min, max: max};
});

var ctx = o.ui.canvas.get_context(500,500),
canvas = ctx.canvas,
path,
find_position = o.call_once(o.dom.find_position[o.curry](canvas)),
get_point_from_coordinate = function (coordinate) {
	return {
		x: coordinate.x - find_position().x,
		y: coordinate.y - find_position().y
	};
},
drawing = false,
get_div = o.call_once(function () {
	var div = o.dom.node('<div></div>');
	document.body.appendChild(div);
	return div;
}),
log = function (message) {
	get_div().innerHTML = message;
};

o.dom.event.add_listener(canvas,'mousedown',function (e,oe) {
	o.ui.canvas.clear(ctx);
	drawing = true;

	path = new Path(get_point_from_coordinate(oe.get_mouse_coordinates()))

});

o.dom.event.add_listener(canvas,'mousemove',function (e,oe) {

	var point = get_point_from_coordinate(oe.get_mouse_coordinates());

	ctx.beginPath();
	var last_point = path.points[o.last]();
	ctx.moveTo(last_point.x,last_point.y);
	ctx.lineTo(point.x,point.y);
	ctx.stroke();

	path.add(point);

}[o.only_if](function () {return drawing;}));

o.dom.event.add_listener(document,'mouseup',function (e,oe) {
	drawing = false;
	log('!!!!!!!!!!!!!');
}[o.only_if](function () {return drawing;}));
