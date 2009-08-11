//= require <oatlib-ui/transition/transition>
//= require <oatlib-ui/transitions/sine_ease_in_out>
example = function () {
	o.ui.transition({
		start: 0,
		end: 255,
		duration: 3 * 60E3,
		tween: o.ui.sine_ease_in_out,
		callback: function (v) {
			var color = 'rgb('+Math.floor(v)+',0,0)';
			document.documentElement.style.backgroundColor = color;
		},
		on_complete: function () {
		}
	});
};
example();
