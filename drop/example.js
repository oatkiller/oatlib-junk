//= require <oatlib-ui/drop/drop_helper>
var drop_event = o.ui.drop_helper();
drop_event.multi_subscribe({
	'on_drop': function (payload) {
		if (payload.data.displaced === true) {
			alert('displaced');
			//console.log(payload.data,payload.data.displaced);
		}
	}
});
