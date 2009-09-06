//= require <oatlib-ui/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <dom/element>
//= require <dom/event/add_listener>
//= require <dom/remove>
//= require <dom/find_position>
//= require <map>

o.ui.whiteboard = function () {
	var width = 600,
	height = 600,
	buffer_ctx = o.ui.canvas.get_context(width,height),
	buffer_canvas = buffer_ctx.canvas,
	buffer_canvas_position = o.dom.find_position(buffer_canvas),
	cache_ctx = o.ui.canvas.get_context(width,height),
	cache_canvas = cache_ctx.canvas,
	strokes = [],
	current_stroke,
	point_from_mouse_coordinates = function (mouse_coordinate) {
		mouse_coordinate.x -= buffer_canvas_position.x;
		mouse_coordinate.y -= buffer_canvas_position.y;
		return mouse_coordinate;
	},
	clear_board = function () {
		erase_board();
		erase_board(cache_ctx);
		strokes.length = 0;
	},
	erase_board = function (ctx) {
		ctx = ctx || buffer_ctx;
		canvas = ctx.canvas;
		ctx.clearRect(0,0,canvas.width,canvas.height);
	},
	draw_cache = function () {
		buffer_ctx.drawImage(cache_canvas,0,0);
	},
	update_board = function () {
		erase_board();
		draw_cache();
		current_stroke.draw();
	},
	stroke_settings = {
		lineWidth: 20,
		lineCap: 'round',
		lineJoin: 'round'
	},
	stroke = function () {
		return o.combine({},stroke_settings,{
			points: [],
			add_point: function (point) {
				this.points.push(point);
				update_board();
			},
			draw: function (ctx) {
				if (this.points.length < 2) {return;}
				ctx = ctx || buffer_ctx;
				ctx.save();

				// set options
				['fillStyle','strokeStyle','lineWidth','lineCap','lineJoin','miterLimit'][o.each](function (property) {
					this[property] !== undefined && (ctx[property] = this[property]);
				}[o.bind](this));

				var my_path = ctx.beginPath(),
				my_points = this.points.slice(0),
				first_point = my_points.shift();
				ctx.moveTo(first_point.x,first_point.y);
				while (my_points.length) {
					var my_next_point = my_points.shift();
					ctx.lineTo(my_next_point.x,my_next_point.y);
				}

				// if this path is closed, do that
				if (this.close) {
					ctx.closePath();
					ctx.fill();
				}
				
				ctx.stroke();
				ctx.restore();
			}
		});
	},
	stroking = false,
	begin_stroke = function (point) {
		update_stroke_settings(); // cheap way of always having the up to date stroke settings
		stroking = true;
		current_stroke = stroke();
		current_stroke.add_point(point);
	},
	end_stroke = function () {
		stroking = false;
		strokes.push(current_stroke);
		current_stroke.draw(cache_ctx);
	},
	add_point = function (point) {
		current_stroke.add_point(point);
	};

	o.dom.remove(cache_canvas);

	o.dom.event.add_listener(buffer_canvas,'mousedown',function (e,oe) {
		begin_stroke(point_from_mouse_coordinates(oe.get_mouse_coordinates()));
	});

	o.dom.event.add_listener(document,'mouseup',function () {
		end_stroke();
	}[o.only_if](function () {
		return stroking;
	}));

	o.dom.event.add_listener(buffer_canvas,'mousemove',function (e,oe) {
		add_point(point_from_mouse_coordinates(oe.get_mouse_coordinates()));
	}[o.only_if](function () {
		return stroking;
	}));

	var inputs = o.map({
		width: 'width_input',
		stroke: 'stroke_input',
		fill: 'fill_input',
		close: 'close_input'
	},o.dom.element),
	update_stroke_settings = function () {
		stroke_settings.lineWidth = parseFloat(inputs.width.value);
		stroke_settings.strokeStyle = inputs.stroke.value;
		stroke_settings.fillStyle = inputs.fill.value;
		stroke_settings.close = inputs.close.checked;
	},
	clear_button = o.dom.element('clear');

	o.dom.event.add_listener(clear_button,'click',function () {
		clear_board();
	});


	

};
