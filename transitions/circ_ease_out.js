//= require <oatlib-ui/transitions/reference>
o.ui.transitions.circ_ease_out = function (t, b, c, d) {
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};
