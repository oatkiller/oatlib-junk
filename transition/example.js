//= require <oatlib-ui/transition/transition>
//= require <oatlib-ui/transition/sine_ease_in_out>
example = function () {
	o.ui.transition({
		start: 0,
		end: 10,
		duration: 1E3,
		tween: o.ui.sine_ease_in_out,
		callback: function (v) {
			console.log(v);
		},
		on_complete: function () {
			console.log('done');
		}
	});
};
