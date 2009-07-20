//= require <oatlib-ui/reference>
//= require <dom/get_window_size>
//= require <dom/get_scroll_offsets>
//= require <dom/event/add_listener>
$$_ui_scroll_at_edges = $$_ui.scroll_at_edges = function () {
	var current_window_size = $$_dom_get_window_size(),
	current_scroll_offsets = $$_dom_get_scroll_offsets(),
	current_mouse_coordinates,
	cancel_window_size_watcher = $$_dom_event_add_listener(window,$resize,function (e,oe) {
		current_window_size = $$_dom_get_window_size();
	}),
	cancel_scroll_offsets_watcher = $$_dom_event_add_listener(window,$scroll,function (e,oe) {
		current_scroll_offsets = $$_dom_get_scroll_offsets();
	}),
	edge_size = $$_ui_scroll_at_edges.edge_size;
	scroll_amount = $$_ui_scroll_at_edges.scroll_amount;
	cancel_mouse_coordinate_watcher = $$_dom_event_add_listener(document,$mousemove,function (e,oe) {
		current_mouse_coordinates = oe.get_mouse_coordinates();
		var y = current_scroll_offsets.y, x = current_scroll_offsets.x, width = current_window_size.width, height = current_window_size.height, my = current_mouse_coordinates.y, mx = current_mouse_coordinates.x, new_x, new_y;
		if (y + edge_size > my) {
			new_y = y - scroll_amount;
		}	else if (y + height - edge_size < my) {
			new_y = y + scroll_amount;
		}

		if (x + edge_size > mx) {
			new_x = x - scroll_amount;
		}	else if (x + width - edge_size < mx) {
			new_x = x + scroll_amount;
		}

		(new_y || new_x) && window.scrollTo(new_x || x,new_y || y);
	});
	return function () {
		cancel_window_size_watcher();
		cancel_scroll_offsets_watcher();
		cancel_mouse_coordinate_watcher();
	};
};
$$_ui_scroll_at_edges.edge_size = 50;
$$_ui_scroll_at_edges.scroll_amount = 100;
