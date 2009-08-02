//= require <oatlib-ui/effects/reference>
o.ui.effects.place_canvas = function (coordinates) {
	var canvas = document.createElement('canvas'),
	context;
	canvas.width = coordinates.width;
	canvas.height = coordinates.height;
	canvas.style.left = coordinates.left + 'px';
	canvas.style.top = coordinates.top + 'px';
	canvas.style.position = 'absolute';
	canvas.style.zIndex = '2';
	document.body.appendChild(canvas);
	if (context = canvas.getContext('2d')) {
		return {
			canvas: canvas,
			context: context
		};
	}
	return false;
};
