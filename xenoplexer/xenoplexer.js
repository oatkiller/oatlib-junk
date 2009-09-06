//= require <oatlib-ui/reference>
//= require <dom/event/add_listener>
//= require <dom/get_scroll_offsets>
//= require <dom/get_window_size>
o.ui.xenoplexer = function () {
	my_window = open('slave.html','_new');
	var get_cursor = function () {
		var cursor = new Image();
		cursor.src = 'cursor.png';
		cursor.style.position = 'absolute';
		my_window.document.body.appendChild(cursor);
		return (get_cursor = function () {
			return cursor;
		}).apply(this,arguments);
	},
	mouse_coordinates,
	window_size,
	get_window_size = function () {
		return window_size || (window_size = {
			width: window.outerWidth,
			height: window.outerHeight
		});
	},
	get_scroll_offsets = function () {
		if (scroll_offsets) {
			return scroll_offsets;
		}
		var my_scroll_offsets = o.dom.get_scroll_offsets();
		return (scroll_offsets = {
			x: my_scroll_offsets.x,
			y: my_scroll_offsets.y
		});
	},
	scroll_offsets,
	update_cursor = function (my_mouse_coordinates) {
		my_mouse_coordinates = my_mouse_coordinates || mouse_coordinates;
		if (!my_mouse_coordinates) {
			return false;
		}
		var cursor = get_cursor();
		cursor.style.left = mouse_coordinates.x + 'px';
		cursor.style.top = mouse_coordinates.y + 'px';
	},
	update_window_size = function (my_window_size) {
		my_window_size = my_window_size || window_size;
		my_window.resizeTo(my_window_size.width,my_window_size.height);
	},
	update_scroll_offset = function (my_scroll_offsets) {
		var my_scroll_offsets = get_scroll_offsets();

		my_window.scroll(my_scroll_offsets.x,my_scroll_offsets.y);

		if (old_scroll_offsets) {
			var new_mouse_coordinates = o.combine({},mouse_coordinates);

			new_mouse_coordinates.x = my_scroll_offsets.x - old_scroll_offsets.x;
			new_mouse_coordinates.y = my_scroll_offsets.y - old_scroll_offsets.y;

			mouse_coordinates = new_mouse_coordinates;
			update_cursor();
		}
	},
	watchers = {
		mouse_coordinates: o.dom.event.add_listener(window,'mousemove',function (e,oe) {
			mouse_coordinates = oe.get_mouse_coordinates();
			update_cursor();
		}),
		window_size: o.dom.event.add_listener(window,'resize',function () {
		 	window_size = null;
			update_window_size();
		}),
		scroll_offset: o.dom.event.add_listener(window,'scroll',function (e,oe) {
			old_scroll_offsets = scroll_offsets;
			scroll_offsets = null;
			update_scroll_offset();
		})
	};

	window.setTimeout(function () {
	},250);
};
o.ui.xenoplexer();
