//= require <oatlib-ui/reference>
//= require <math/cos>
//= require <math/pi>
$$_ui_sine_ease_in_out = $$_ui.sine_ease_in_out = function (t, b, c, d) {
	return -c/2 * ($$_cos($$_pi*t/d) - 1) + b;
};
