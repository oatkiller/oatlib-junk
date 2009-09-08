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
	get_context = o.ui.canvas.get_context[o.curry](width,height),
	clear_ctx = function (ctx) {
		var canvas = ctx.canvas;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		return ctx;
	},
	board = {
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
			clear_ctx(this.presentation_context);
			this.presentation_context.drawImage(this.path_context.canvas,0,0);
			this.presentation_context.drawImage(this.tool_context.canvas,0,0);
		}
	},
	tool = {
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
			ctx.strokeStyle = 'rgba(0,0,0,.5)';
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.settings.line_width,0,Math.PI*2,true);
			ctx.stroke();
			ctx.restore();
		}
	};

	o.dom.event.add_listener(board.presentation_context.canvas,'mousemove',function (e,oe) {
		this.set_point_from_mouse_coordinates(oe.get_mouse_coordinates());
		this.draw();
	}[o.bind](tool));

};
