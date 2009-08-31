//= require <oatlib-ui/states/states>
(function () {

	test({
		name: 'states',
		'enter runs enter fn': function () {
			var count = 0;
			var states = o.ui.states({
				'initial': {
					enter: function () {
						count++;
					}
				}
			});
			Assert.areSame(0,count);
			states.enter('initial');
			Assert.areSame(1,count);
		}
	});

	/*
		var states = o.ui.states({
			'initial': function () {
				implied_enter: true,
				enter: function () {
				}
			},
			'busy': {
				enter: function () {
				},
				leave: function () {
				}
			}
		});
	*/

})();
