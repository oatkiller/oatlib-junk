//= require <oatlib-ui/canvas/reference>
o.ui.canvas.get_canvas = function (width,height) {
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	return canvas;
};
