//= require <oatlib-ui/transitions/reference>
o.ui.transitions.sine_ease_in_out = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
