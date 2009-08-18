//= require <oatlib-ui/canvas/get_context_helper>
with (o.ui.canvas) {
	var percent = .8,
	width = 100,
	height = 500,
	ctx = o.ui.canvas.get_context_helper(width,height);
	var snr = function (fn) {
		return function () {
			ctx.save();
			fn.apply(this,arguments);
			ctx.restore();
		};
	};
	var draw_background = snr(function () {
		ctx.fillStyle = 'rgba(50,50,50,.5)';
		ctx.fillRect(0,0,width,height);
	});
	draw_background();


	var left = percent,
	so_far = 0,
	unit_height = height / 10;
	block_height = unit_height - 4;

	while (left > 0) {
		ctx.save();
		//ctx.fillRect(0,height - (so_far + 1) * unit_height + 2
		ctx.restore();
	}

 	ctx.fillStyle = 'rgba(255,50,50,.8)';
	//ctx.fillRect(0,.5 * height,width,height - .5 * height);
	ctx.fillRect(0,height - height * percent,width,height * percent);
}
