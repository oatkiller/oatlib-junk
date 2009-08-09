//= require <dom/event/add_listener>
//= require <dom/add_class_name>
//= require <dom/remove_class_name>
(function () {
	var boxes = {},
	get_box_for_key = function (key) {
		return boxes[key.character] || (function () {
			var box = (boxes[key.character] = document.body.appendChild(document.createElement('div')));
			box.innerHTML = key.character;
			return box;
		})(); 
	};
	o.dom.event.add_listener(window,'keydown',function (e,oe) {
		o.dom.add_class_name(get_box_for_key(oe.get_key()),'pressed');
	});
	o.dom.event.add_listener(window,'keyup',function (e,oe) {
		o.dom.remove_class_name(get_box_for_key(oe.get_key()),'pressed');
	});
})();
