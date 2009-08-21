//= require <oatlib-ui/reference>
//= require <application_event>
//= require <dom/event/add_listener>
//= require <bind>
(function () {
	var my_event = o.application_event(),
	last_time = new Date().getTime(),
	my_interval = setInterval(function () {
		var current_time = new Date().getTime(),
		difference = current_time - last_time;
		last_time = current_time;
		difference > 1E3 && my_event.fire(difference);
	},.5E3);
	o.dom.event.add_listener(window,'unload',function () {
		clearInterval(my_interval);
	});
	o.ui.on_return_from_idle = my_event.subscribe[o.bind](my_event);
})();
