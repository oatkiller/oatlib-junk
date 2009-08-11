//= require <oatlib-ui/transitions/sine_ease_in_out>
//= require <oatlib-ui/transition/transition>

test({
	name: 'transition',
	'transition reaches end result': function () {
		var duration = .25E3, end = 10, value, on_complete_ran = false;
		o.ui.transition({
			start: 0,
			end: end,
			duration: duration,
			tween: o.ui.sine_ease_in_out,
			callback: function (v) {
				value = v;
			},
			on_complete: function () {
				on_complete_ran = true;
			}
		});
		this.wait(function () {
			Assert.isFalse(end === value);
			Assert.isFalse(on_complete_ran);
			this.wait(function () {
				Assert.areSame(end,value);
				Assert.isTrue(on_complete_ran);
			},100);
		},duration - 50);
	}
});
