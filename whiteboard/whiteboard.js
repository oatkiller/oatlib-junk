//= require <oatlib-ui/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <dom/element>
//= require <dom/event/add_listener>
//= require <dom/hide>
//= require <dom/find_position>
//= require <map>
//= require <last>
//= require <error>

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
		paths: [],
		update: function () {
			clear_ctx(this.presentation_context);
			this.presentation_context.drawImage(this.path_context.canvas,0,0);
			this.presentation_context.drawImage(this.tool_context.canvas,0,0);
		}
	},
	path_builder = o.builder({
		add_point: function (point) {
			(this.points || (this.points = [])).push({
				x: point.x,
				y: point.y
			});
		},
		draw: function (ctx) {
			if (this.points === undefined || this.points.length < 2) {return false;}
			ctx = ctx || board.path_context;
			ctx.save();

			ctx.lineWidth = this.settings.line_width;
			ctx.lineCap = this.settings.line_cap;
			ctx.lineJoin = this.settings.line_join;
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
			board.path_context.drawImage(board.tool_context.canvas,0,0);
			delete tool.edit_path;
		}
	}),
	tool = {
		get_path: function (settings) {
			if (this.edit_path) {
				return this.edit_path;
			} else {
				this.edit_path = path_builder({
					settings: o.combine({},this.settings),
					points: []
				});
				this.edit_path.add_point(this);
			}
		},
		settings: {
			line_width: 30,
			stroke_style: '#000000',
			line_cap: 'round',
			line_join: 'round'
		},
		set_point_from_mouse_coordinates: function (coordinates) {
			var position = o.dom.find_position(board.presentation_context.canvas);
			this.x = coordinates.x - position.x;
			this.y = coordinates.y - position.y;
			if (this.edit_path) {
				this.edit_path.add_point(this);
			}
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
			//console.log('drawing the shadow');
			var ctx = board.tool_context;
			ctx.save();
			ctx.strokeStyle = 'rgba(0,0,0,.5)';
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.settings.line_width / 2,0,Math.PI*2,true);
			ctx.stroke();
			ctx.restore();
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
	}[o.bind](tool));
	o.dom.event.add_listener(document,'mouseup',function (e,oe) {
		this.edit_path && this.edit_path.save();
		this.draw();
	}[o.bind](tool));


	['tool','path'][o.each](function (a) {
		o.dom.hide(board[a+'_context'].canvas);
	});

};
