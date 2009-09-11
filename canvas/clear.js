//= require <oatlib-ui/canvas/reference>
o.ui.canvas.clear = function (ctx_or_canvas) {
	var ctx = ctx_or_canvas.canvas ? ctx_or_canvas : ctx_or_canvas.getContext('2d'),
	canvas = ctx.canvas;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	return ctx;
};
