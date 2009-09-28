//= require <oatlib-ui/transitions/reference>
o.ui.transitions.circ_ease_in = function (t, b, c, d) {
	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};
