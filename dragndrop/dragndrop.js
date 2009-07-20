//= require <dom/absolutize>
//= require <dom/array>
//= require <find>
//= require <dom/find_position>
//= require <dom/clear_interval>
//= require <oatlib-ui/scroll_at_edges/scroll_at_edges>
//= require <dom/event/delegate>
//= require <dom/add_class_name>
//= require <dom/event/prevent_select>
//= require <dom/find_ancestor_or_self>
//= require <dom/get_element_at_point>
//= require <dom/get_style>
//= require <dom/has_class_name>
//= require <dom/get_scroll_offsets>
//= require <supplant>
//= require <dom/hide>
//= require <dom/insert_after>
//= require <dom/insert_before>
//= require <dom/node>
//= require <dom/remove>
//= require <dom/remove_class_name>
//= require <dom/set_interval>
//= require <dom/unhide>
//= require <empty_function>
//= require <return_false>

var cancel_active_drag,
current_z_index = 1,
parse_pixel_value = function (value) {
	var minus_px = value.replace(/px$/);
	if (value !== minus_px) {
		return parseFloat(minus_px);
	}
	return false;
},
wait = 1E3 / 32,
begin_dragging = function (data) {

	var target_node = data.target_node,
	starting_point_x = 0,
	starting_point_y = 0,
	get_style = $$_dom_get_style[$$_o$curry](target_node),
	original_mouse_coordinates = data.mouse_coordinates,
	current_mouse_coordinates = original_mouse_coordinates,
	current_element_at_point,
	mouse_coordinate_watcher,
	current_window_size = $$_dom_get_window_size(),
	current_scroll_offsets = $$_dom_get_scroll_offsets(),
	update_target_position,
	cancel_mouseup,
	cancel_auto_scroller = $$_ui_scroll_at_edges(),
	target_offset_width = target_node.offsetWidth,
	target_offset_height = target_node.offsetHeight,
	drop_marker_node = $$_dom_node('<div></div>');

	$$_dom_insert_before(target_node,drop_marker_node);
	var position = $$_dom_absolutize(target_node);
	drop_marker_node.style.width = target_offset_width + 'px';
	drop_marker_node.style.height = target_offset_height + 'px';

	target_node.style.zIndex = ++current_z_index;

	$$_dom_add_class_name(target_node,'in_drag');

	starting_point_y = position.y;
	starting_point_x = position.x;

	// this is a function that will cancel everything that was setup
	cancel_active_drag = function () {
		mouse_coordinate_watcher();
		cancel_auto_scroller();
		$$_dom_clear_interval(update_target_position);
		$$_dom_insert_before(drop_marker_node,target_node);
		$$_dom_remove(drop_marker_node);
		$$_dom_remove_class_name(target_node,'in_drag');
		target_node.style.width = target_node.style.height = target_node.style.position = target_node.style.top = target_node.style.left = emptyString;
		cancel_active_drag = undefined;
		cancel_mouseup();
	};

	cancel_mouseup = $$_dom_event_add_listener(document,$mouseup,function (e,oe) {
		cancel_active_drag && cancel_active_drag();
	});

	mouse_coordinate_watcher = $$_dom_event_add_listener(document,$mousemove,function (e,oe) {

		// update your stored stuff for next time
		var old_mouse_coordinates = current_mouse_coordinates,
		old_element_at_point = current_element_at_point;
		current_mouse_coordinates = oe.get_mouse_coordinates();
		
		// we hide the draggable over and over, otherwise we cant figure out what its over cause it shims everything!!!!??
		$$_dom_hide(target_node);

		current_element_at_point = $$_dom_get_element_at_point(current_mouse_coordinates);

		// determine if the draggable is on a droppable and if so, move stuff
		current_element_at_point && current_element_at_point !== drop_marker_node && current_element_at_point !== old_element_at_point && $$_dom_find_ancestor_or_self(current_element_at_point,function (n) {
			if ($$_dom_has_class_name(n,'draggable')) {
				old_mouse_coordinates.y > current_mouse_coordinates.y ? $$_dom_insert_before(n,drop_marker_node) : $$_dom_insert_after(n,drop_marker_node);
				return true;
			} else if ($$_dom_has_class_name(n,'droppable')) {
				var the_one;
				if (the_one = $$_dom_array(n.childNodes)[$$_o$find](function (l) {
					return $$_dom_has_class_name(l,'draggable') && $$_dom_find_position(l).y > current_mouse_coordinates.y;
				})) {
					$$_dom_insert_before(the_one,drop_marker_node);
					return true;
				} else {
					n.appendChild(drop_marker_node);
					return true;
				}
			}
		});

		$$_dom_unhide(target_node);

	});

	// we constantly move the target draggable under the cursor
	update_target_position = $$_dom_set_interval(function () {
		target_node.style.left = (starting_point_x + (current_mouse_coordinates.x - original_mouse_coordinates.x)) + 'px';
		target_node.style.top = (starting_point_y + (current_mouse_coordinates.y - original_mouse_coordinates.y)) + 'px';
	},wait);

},
is_draggable = function (n) {
	return $$_dom_has_class_name(n,$draggable);
};

$$_dom_event_prevent_select(is_draggable);
$$_dom_event_delegate({
	ancestor: document.body,
	type: $mousedown,
	test: is_draggable,
	action: function (e,oe) {
		if (!cancel_active_drag) {
			begin_dragging({
				target_node: oe.delegate_target,
				mouse_coordinates: oe.get_mouse_coordinates()
			});
		}
	}
});
