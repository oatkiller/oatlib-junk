//= require <oatlib-ui/effects/reference>
//= require <oatlib-ui/effects/place_canvas>
//= require <oatlib-ui/transitions/sine_ease_in_out>
//= require <oatlib-ui/transition/transition>
o.ui.effects.tronline = function (coordinates,style) {
	var stuff = o.ui.effects.place_canvas(coordinates),
	ctx = stuff.context;
	style = style || {};
	ctx.lineWidth = style.line_width || 5;
	ctx.lineCap = style.line_cap || 'butt';
	ctx.lineJoin = style.line_join || 'round';

	var older_point,
	old_point,
	current_point,
	radius = 5,
	double_radius = radius * 2,
	negative_radius = -radius,
	gradient = ctx.createRadialGradient(0,0,0,0,0,radius);
	gradient.addColorStop(0,'#ff00ff');
	gradient.addColorStop(1,'#fff');
	ctx.fillStyle = gradient;
	ctx.strokeStyle = '#000',
	transitions = [
		// transition from the top-right to the top-left
		function (ctx) {
			ctx.translate(197,3);
			ctx.rotate(Math.PI);
		},

		// transition from the top-left to the bottom-left
		function (ctx) {
			ctx.translate(3,3);
			ctx.rotate(.5 * Math.PI);
		},

		// transition from the bottom-left to the bottom-right
		function (ctx) {
			ctx.translate(3,197);
			//ctx.rotate(180);
		},

		// transition from the bottom-right to the top-right
		function (ctx) {
			ctx.translate(197,197);
			ctx.rotate(1.5 * Math.PI);
		}

	];

	var do_it = function (transformations) {
		var old_v = 0;
		o.ui.transition({
			start: 0,
			end: 200,
			duration: 45,
			tween: o.ui.sine_ease_in_out,
			callback: function (v) {
				ctx.save();
				transformations(ctx);
				ctx.beginPath();
				ctx.moveTo(old_v,0);
				ctx.lineTo(v,0);
				ctx.stroke();
				ctx.restore();
				old_v = v;
			},
			on_complete: function () {
				transitions.length && do_it(transitions.shift());
			}
		});
	};

	transitions.length && do_it(transitions.shift());

};
