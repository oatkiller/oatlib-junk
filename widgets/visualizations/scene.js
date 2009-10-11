//= require <oatlib-ui/canvas/get_context>
//= require <class>
//= require <bind>
//= require <map>
//= require <each>
//= require <range>
var Scene = function (size) {
	this.camera = {
		position: v(.5,.5,5),
		rotation: v(0,0,0),
		viewer: v(1,0,1)
	};
	this.size = size;
	this.ctx = o.ui.canvas.get_context(size.x,size.y);
	this.ctx.strokeStyle = 'rgba(255,0,0,.2)';
}[o.class]({
	get2DPoint: function (a) {
		var c = this.camera.position, O = this.camera.rotation, e = this.camera.viewer;
		// c: the location of the camera.
		// theta: The rotation of the camera. c=<0,0,0>, and theta=<0,0,0>, the 3D vector <1,2,0> is projected to the 2D vector <1,2>.
		// e: the viewer's position relative to the display surface.

		var sin = Math.sin, cos = Math.cos, d = {};
		d.x = cos(O.y) * (sin(O.z) * (a.y - c.y) + cos(O.z) * (a.x - c.x)) - sin(O.y) * (a.z - c.z);
		d.y = sin(O.x) * (cos(O.y) * (a.z - c.z) + sin(O.y) * (sin(O.z) * (a.y - c.y) + cos(O.z) * (a.x - c.x))) + cos(O.x) * (cos(O.z) * (a.y - c.y) - sin(O.z) * (a.x - c.x));
		d.z = cos(O.x) * (cos(O.y) * (a.z - c.z) + sin(O.y) * (sin(O.z) * (a.y - c.y) + cos(O.z) * (a.x - c.x))) - sin(O.x) * (cos(O.z) * (a.y - c.y) - sin(O.z) * (a.x - c.x));
		return {
			x: (d.x - e.x) * (e.z / d.z),
			y: (d.y - e.y) * (e.z / d.z)
		};
	},
	scale: function (point) {
		var size = this.size;
		return {
			x: (point.x + 1) / 2 * size.x,
			y: (point.y + 1) / 2 * size.y,
			z: 'z' in point && 'z' in size ? (point.z + 1) / 2 * size.z : undefined
		};
	},
	renderABox: function (box) {
		o.range(0,5)[o.each](function (i) {
			var side = box.getSide(i)[o.map](this.get2DPoint[o.bind](this))[o.map](this.scale[o.bind](this)),
			a = side[0],
			b = side[1],
			c = side[2],
			d = side[3],
			ctx = this.ctx;

			ctx.beginPath();
			ctx.moveTo(a.x,a.y);
			ctx.lineTo(b.x,b.y);
			ctx.lineTo(c.x,c.y);
			ctx.lineTo(d.x,d.y);
			ctx.stroke();
			
		}[o.bind](this));
	}
});

