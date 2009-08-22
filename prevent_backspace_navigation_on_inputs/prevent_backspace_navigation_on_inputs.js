//= require <oatlib-ui/reference>
//= require <dom/event/add_listener>
o.ui.prevent_backspace_navigation_on_inputs = function () {
	o.dom.event.add_listener(document,'keypress',function (e,oe) {
		oe.get_key().key === 8 && !['INPUT','OPTION','TEXTAREA','SELECT','OPTGROUP','BUTTON'][o.contains](oe.get_target().tagName) && oe.prevent_default();
	});
};
