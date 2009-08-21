//= require <oatlib-ui/on_return_from_idle/on_return_from_idle>
test({
	name: 'on_return_from_idle',
	'works': function () {
		var count = 0;
		o.ui.on_return_from_idle(function () {
			count++;
		});
		Assert.areSame(0,count);
		this.wait(function () {
			Assert.areSame(0,count,'shouldntve called on_return_from_idle');
		},3.1E3);
	}
});
