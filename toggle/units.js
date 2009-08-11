//= require <oatlib-ui/toggle/toggle>
test({
	name: 'toggle',
	'works': function () {
		var my_div = document.createElement('div');
		my_div.innerHTML = '';
		Assert.areSame('',my_div.innerHTML);
		var my_toggle = o.ui.toggle(my_div,'innerHTML','foo');
		Assert.areSame('foo',my_div.innerHTML);
		my_toggle('bar');
		Assert.areSame('bar',my_div.innerHTML);
		my_toggle();
		Assert.areSame('foo',my_div.innerHTML);
		my_toggle();
		Assert.areSame('bar',my_div.innerHTML);
		my_toggle();
	}
});
