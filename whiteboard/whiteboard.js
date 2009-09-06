//= require <oatlib-ui/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <dom/event/delegate>
//= require <dom/is_tag_name>
//= require <rcurry>
//= require <dom/find_position>

o.ui.whiteboard = function () {
	var ctx = o.ui.canvas.get_context(600,600),
	canvas = ctx.canvas,
	position = o.dom.find_position(canvas),
	mousedown = false,
	stroking = false,
	stroke_data,
	old_strokes = [],
	begin_stroke = function () {
		end_stroke();
		stroke_data = [];
		stroking = true;
	},
	end_stroke = function () {
		stroking = false;
		old_strokes.push(stroke_data);
	}[o.only_if](function () {
		return stroking;
	}),
	draw_stroke = function (stroke_data) {
		ctx.save();
		var my_stroke_data = stroke_data.slice(0);
		var first_point = my_stroke_data.shift();
		ctx.moveTo(first_point.x,first_point.y);
		console.log('moving to');
		while (my_stroke_data.length) {
			var point = my_stroke_data.shift();
			ctx.lineTo(point.x,point.y);
		}
		ctx.stroke();

		ctx.restore();
	}[o.only_if](function (stroke_data) {
		console.log('draw stroke?: ',stroke_data.length > 1);
		return stroke_data.length > 1;
	}),
	draw_board = function () {
		console.log('clearing');
		ctx.clearRect(0,0,canvas.width,canvas.height);
		old_strokes[o.each](draw_stroke);
		draw_stroke(stroke_data);
	},
	add_coordinates = function (mouse_coordinates) {
		var coordinates = mouse_coordinates;
		coordinates.y = coordinates.y - position.y;
		coordinates.x = coordinates.x - position.x;
		stroke_data.push(coordinates);
		draw_board();
	};

	o.dom.event.add_listener(document,'mousedown',function (e,oe) {
		mousedown = true;
		begin_stroke();
		add_coordinates(oe.get_mouse_coordinates());
	});

	o.dom.event.add_listener(document,'mouseup',function () {
		mousedown = false;
		end_stroke();
	});

	o.dom.event.add_listener(canvas,'mousemove',function (e,oe) {
		add_coordinates(oe.get_mouse_coordinates());
	}[o.only_if](function () {
		return mousedown;
	}));

};

