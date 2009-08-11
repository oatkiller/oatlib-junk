//= require <oatlib-ui/modal/modal>
test({
	name: 'modal',
	'o.ui.modal doesnt throw an error': function () {
		o.ui.modal(document.createElement('div'));
	},
	'o.ui.hide_modal doesnt throw an error': function () {
		o.ui.modal(document.createElement('div'));
		o.ui.hide_modal();
	}
});
