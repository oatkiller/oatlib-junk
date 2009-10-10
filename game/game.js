//= require <oatlib-ui/canvas/get_context>
//= require <get_once>
//= require <each>
//= require <any>
//= require <builder>
//= require <bind>

var rect = o.builder({
	draw: function (ctx) {
		ctx.save();
		ctx.fillStyle = '#000';
		ctx.strokeRect(this.x,this.y,this.width,this.height);
		ctx.restore();
	},
	applyVector: function (vector) {
		this.velocity.y += vector.y;
		this.velocity.x += vector.x;
	},
	applyVelocity: function () {
		var new_x_y = v(this.x + this.velocity.x,this.y + this.velocity.y);
		if (world.colides(o.combine(o.mask(this),new_x_y))) {
			this.velocity.x *= -.98;
			this.velocity.y *= -.98;
			return this.applyVelocity();
		} else {
			o.combine(this,new_x_y);
		}
	},
	colides: function (test_prim) {
		return test_prim.
	}
}),
vector_builder = o.builder({
}),
v = function (x,y) {
	return vector_builder({x: x, y: y});
};

var world = {
	width: 100,
	height: 100,
	fps: 32,
	colides: function (test_prim) {
		return !this.prims[o.any](function (prim) {
			return prim.colides(test_prim);
		});
	},
	prims: [
		rect({
			name: 'floor',
			width: 100,
			height: 10,
			x: 0,
			y: 90,
			shape: rect
		}),
		rect({
			name: 'player',
			x: 10,
			y: 40,
			width: 10,
			height: 20
		})
	],
	getContext: function () {
		var ctx = o.ui.canvas.get_context(this.width,this.height);
		this.canvas = ctx.canvas;
		return ctx;
	}[o.get_once](),
	stop: function () {
		clearTimeout(this.running);
	},
	start: function () {
		var that = this, fn;
		(fn = function () {
			that.running = setTimeout(function () {
				that.draw();
				fn();
			},1E3 / this.fps);
		})();
	},
	gravity: v(0,-9.8 / this.fps),
	applyGravity: function () {
		this.prims[o.each](function (prim) {
			prim.applyVector(this.gravity);
		});
	},
	draw: function () {
		console.count('draw');
		this.applyGravity();
		var ctx = this.getContext();
		this.prims[o.each](function (prim) {
			prim.draw(ctx);
		});
	}
};

world.start();



/*
var window_size = o.dom.get_window_size(),
ctx = o.ui.canvas.get_context(window_size.width - 20,window_size.height - 20),
canvas = ctx.canvas,
fps = 32,
gravity = 9.8 / fps,
screen = {
	clear: function () {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		return this;
	}
},
player = {
	v: {x: 0, y: 0},
	x: 0,
	y: 0,
	w: 10,
	h: 30,
	applyVector: function (vector) {
		this.v.x += vector.x;
		this.v.y += vector.y;
	},
	draw: function () {
		this.x += this.v.x;
		this.y += this.v.y;
		ctx.save();
		ctx.fillStyle = '#000';
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.restore();
	}
};
o.dom.event.add_listener(window,'keydown',function (e,oe) {
	var key = oe.get_key().key;
	document.title = key;
	switch (key) {
		// up
		case 87: console.log('up'); break;

		// left
		case 65: console.log('left'); break;
		
		// right
		case 68: console.log('right'); break;
		
		// down
		case 83: console.log('down'); break;
	}
});
o.dom.event.add_listener(window,'keyup',function (e,oe) {
	console.clear();
});
setTimeout(function () {
	player.velocity += gravity;
	screen.clear();
	player.draw();
},1E3/fps);
*/
