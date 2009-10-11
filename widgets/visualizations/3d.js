//= require <combine>
//= require <class>
//= require <map>
//= require <each>
//= require <oatlib-ui/canvas/get_context>

(function () {
 	var V = function (x,y,z) {
		x !== undefined && (this.x = x);
		y !== undefined && (this.y = y);
		z !== undefined && (this.z = z);
	};
	var v = function (x,y,z) {
		return new V(x,y,z);
	};
 /*
	var Box = function (position,rotation,scale) {
		o.combine(this,{position: position,rotation: rotation,scale: scale});
		console.log('created box: ',this);
	}[o.class]({
		getPoint: function (i) {
			return v(

			);
		}
	});
	new Box(v(0,0,0),v(0,0,0),v(0,0,0));
	*/
	var my_box = [
		v(0,1,0),
		v(0,1,1),
		v(0,0,1),
		v(0,0,0),
		v(1,1,0),
		v(1,1,1),
		v(1,0,1),
		v(1,0,0)
	];
	my_box.getPoint = function (i) {
		return this[i];
	};

	var get_2d_point = function (a,c,O,e) {
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
	};


	var scale = function (point) {
		return {
			x: (point.x + 1) / 2 * size.x,
			y: (point.y + 1) / 2 * size.y,
			z: 'z' in point && 'z' in size ? (point.z + 1) / 2 * size.z : undefined
		};
	},
	size = v(200,200),
	ctx = o.ui.canvas.get_context(200,200),
	sides = [
		[0,1,2,3],
		[0,3,7,4],
		[4,5,6,7],
		[1,5,6,2],
		[1,0,4,5],
		[2,3,7,6]
	];

	var my_2d_points = my_box[o.map](function (point) {
		return scale(get_2d_point(
			point,
			v(2.5,3.5,5),
			v(0,0,0),
			v(0,0,1)
		));
	});


	ctx.strokeStyle = 'rgba(255,0,0,.2)';

	sides[o.each](function (side) {
		var a = my_2d_points[side[0]],
		b = my_2d_points[side[1]],
		c = my_2d_points[side[2]],
		d = my_2d_points[side[3]];

		console.log(a,b,c,d);
		ctx.beginPath();
		ctx.moveTo(a.x,a.y);
		ctx.lineTo(b.x,b.y);
		ctx.lineTo(c.x,c.y);
		ctx.lineTo(d.x,d.y);
		ctx.stroke();

	});

})();
