//= require <oatlib-ui/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <dom/element>
//= require <dom/event/add_listener>
//= require <dom/remove>
//= require <dom/find_position>
//= require <map>

o.ui.whiteboard = function (width,height) {

	var get_context = o.ui.canvas.get_context[o.curry](width,height),
	clear_ctx = function (ctx) {
		var canvas = ctx.canvas;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		return ctx;
	},
	board = {
		paths: [],
		path_context: get_context(),
		tool_context: get_context(),
		presentation_context: get_context(),
		update: function () {
			if (this.previous_paths_length !== undefined) {
				if (this.previous_paths_length > this.paths.length) {
					this.paths.draw();
				} else if (this.previous_paths_length < this.paths.length) {
					clear_ctx(this.path_context);
					this.paths[o.each](function (path) {
						path.draw();
					});
				}
			}
			clear_ctx(presentation_context);
			presentation_context.drawImage(this.path_context.canvas,0,0);
			presentation_context.drawImage(this.tool_context.canvas,0,0);
		}
	},
	path_builder = o.builder({
		add_point: function (point) {
			(this.points || (this.points = [])).push(point);
		},
		draw: function (ctx) {
			if (this.points === undefined) {return false;}
			ctx = ctx || board.path_context;
			ctx.save();

			ctx.lineWidth = this.settings.line_width;
			ctx.strokeStyle = this.settings.stroke_style;

			ctx.beginPath();
			var points = this.points.slice(0),
			point = points.shift();
			ctx.moveTo(point.x,point.y);
			while (points.length) {
				point = points.shift();
				ctx.lineTo(point.x,point.y);
			}
			ctx.stroke();
			ctx.restore();
		},
		save: function () {
			board.paths.push(this);
			delete tool.edit_path;
		}
	}),
	tool = {
		get_path: function (settings) {
			return this.edit_path || (this.edit_path = path_builder({
				settings: o.combine({},this.settings),
				points: [
					{
						x: this.x,
						y: this.y
					}
				]
			}));
		},
		settings: {
			line_width: 10,
			stroke_style: '#000000'
		},
		set_point_from_mouse_coordinates: function (coordinates) {
			var position = o.dom.find_position(board.presentation_context.canvas);
			this.x = coordinates.x - position.x;
			this.y = coordinates.y - position.y;
		},
		draw: function () {
			clear_ctx(board.tool_context);
			if (this.edit_path) {
				this.edit_path.draw(board.tool_context);
			} else {
				this.draw_shadow();
			}
			board.update();
		},
		draw_shadow: function () {
			var ctx = board.tool_context;
			ctx.save();
			ctx.fillStyle = 'rgba(0,0,0,.5)';
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.settings.line_width,0,Math.PI*2,true);
			ctx.stroke();
			ctx.restore();
		},
		end_path: function () {
		}
	};

	o.dom.event.add_listener(board.presentation_context.canvas,'mousemove',function (e,oe) {
		this.set_point_from_mouse_coordinates(oe.get_mouse_coordinates());
		this.draw();
	}[o.bind](tool));
	o.dom.event.add_listener(board.presentation_context.canvas,'mousedown',function (e,oe) {
		this.set_point_from_mouse_coordinates(oe.get_mouse_coordinates());
		this.get_path();
		this.draw();
	})[o.bind](tool);
	o.dom.event.add_listener(document,'mouseup',function (e,oe) {
		this.edit_path && this.edit_path.save();
		this.draw();
	}[o.bind](tool));

};
