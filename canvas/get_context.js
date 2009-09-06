//= require <oatlib-ui/canvas/reference>
//= require <oatlib-ui/canvas/get_canvas>
o.ui.canvas.get_context = function (width,height) {
	var my_canvas = o.ui.canvas.get_canvas(width,height),
	ctx = my_canvas.getContext('2d');
	document.body.appendChild(my_canvas);
	return ctx;
};
