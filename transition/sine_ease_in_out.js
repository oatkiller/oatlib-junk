//= require <oatlib-ui/reference>
o.ui.sine_ease_in_out = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
