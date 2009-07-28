//= require <oatlib-ui/reference>
//= require <dom/event/delegate>
//= require <combine>
//= require <dom/debounce>
//= require <dom/has_class_name>
//= require <dom/find_following_sibling_or_self>
//= require <hasOwnProperty>
//= require <dom/find_position>
//= require <dom/event/prevent_select>
//= require <dom/set_interval>
//= require <dom/clear_interval>
//= require <math/floor>

var bound = function (n,l,u) {
	return n < l ? l : n > u ? u : n;
},
min_pane_width = 150,
is_resizable_pane = function (n) {
	return n.className && $$_dom_has_class_name(n,'resizable_column');
},
is_resizable_column_handle = function (n) {
	return o.dom.has_class_name(n,'resizable_column_handle');
};

$$_ui_resizable_columns = $$_ui.resizable_columns = function () {

	var panes_i_ever_resized = [],
	begin_resize = function (handle,pane,mouse_coordinates) {
		var current_mouse_coordinates = {
			y: mouse_coordinates.y,
			x: mouse_coordinates.x
		},
		old_mouse_coordinates = {
			x: current_mouse_coordinates.x,
			y: current_mouse_coordinates.y
		},
		handle_width = handle.offsetWidth,
		next_pane = $$_dom_find_following_sibling_or_self(pane,is_resizable_pane);
		cancel = $$_dom_set_interval(function () {

			if (current_mouse_coordinates.y === old_mouse_coordinates.y && current_mouse_coordinates.x === old_mouse_coordinates.x) {
				console.log('nope');
				return false;
			}

			var left_pane_rect = $$_dom_find_position(pane).rect,
			right_pane_rect = $$_dom_find_position(next_pane).rect,
			left_pane_max = right_pane_rect.right - handle_width - min_pane_width, // left pane's max right coordinate must be the right coordinate of the pane to its right, minus the minimum pane width, minus the hande width
			adjusted_mouse_coordinate = bound(current_mouse_coordinates.x,left_pane_rect.left + handle_width + min_pane_width,right_pane_rect.right - handle_width - min_pane_width), // bound the x mouse coordinate by the left min
			left_pane_width = bound($$_floor(adjusted_mouse_coordinate - left_pane_rect.left),min_pane_width - handle_width,left_pane_max);
			var right_pane_width = $$_floor(right_pane_rect.right - (left_pane_rect.left + left_pane_width));

			right_pane_width = right_pane_width < min_pane_width ? min_pane_width : right_pane_width;

			pane.style.width = left_pane_width + 'px';
			next_pane.style.width = right_pane_width + 'px';

		},1E3 / 32),
		me_too = $$_dom_event_add_listener(document,'mousemove',function (e,oe) {
			$$_combine(old_mouse_coordinates,current_mouse_coordinates);
			$$_combine(current_mouse_coordinates,oe.get_mouse_coordinates());
		});
		$$_dom_event_add_listener(document,'mouseup',function (e,oe) {
			$$_dom_clear_interval(cancel);
			me_too();
		});
		panes_i_ever_resized.push(pane,next_pane);
	};

	$$_dom_event_prevent_select(is_resizable_column_handle);

	o.dom.event.delegate({
		type: 'mousedown',
		test: is_resizable_column_handle,
		action: function (e,oe) {
			var pane = $$_dom_find_following_sibling_or_self(oe.delegate_target,is_resizable_pane);
			return pane && begin_resize(oe.delegate_target,pane,oe.get_mouse_coordinates());
		}
	});

	o.dom.event.add_listener(window,'resize',o.dom.debounce(function () {
		panes_i_ever_resized[o.each](function (pane) {
			pane.style.width = '';
		});
		panes_i_ever_resized = [];
	}));

};
