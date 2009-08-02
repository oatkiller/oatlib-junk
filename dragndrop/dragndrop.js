//= require <dom/absolutize>
//= require <oatlib-ui/reference>
//= require <dom/array>
//= require <find>
//= require <dom/find_position>
//= require <dom/clear_interval>
//= require <dom/event/delegate>
//= require <dom/get_window_size>
//= require <dom/add_class_name>
//= require <dom/event/prevent_select>
//= require <dom/find_ancestor_or_self>
//= require <dom/get_style>
//= require <dom/has_class_name>
//= require <dom/get_scroll_offsets>
//= require <supplant>
//= require <dom/hide>
//= require <dom/insert_after>
//= require <dom/insert_before>
//= require <dom/create_element>
//= require <dom/remove>
//= require <dom/remove_class_name>
//= require <dom/set_interval>
//= require <dom/unhide>
//= require <empty_function>
//= require <curry>
//= require <bind>
//= require <return_false>
//= require <application_event>
//= require <dom/parse_pixel_value>

o.ui.dragndrop = function (options) {

	var cancel_active_drag,
	is_draggable = options.draggable,
	is_droppable = options.droppable,
	application_event = options.application_event,
	current_z_index = 1,
	wait = 1E3 / 32,
	begin_dragging = function (data) {

		var target_node = data.target_node,
		starting_point_x = 0,
		starting_point_y = 0,
		get_style = o.dom.get_style[o.curry](target_node),
		original_mouse_coordinates = data.mouse_coordinates,
		current_mouse_coordinates = original_mouse_coordinates,
		current_element_at_point,
		mouse_coordinate_watcher,
		current_window_size = o.dom.get_window_size(),
		current_scroll_offsets = o.dom.get_scroll_offsets(),
		update_target_position,
		cancel_mouseup,
		target_offset_width = target_node.offsetWidth,
		target_offset_height = target_node.offsetHeight,
		drop_marker_node = o.dom.create_element('div'),
		fire = function () {
			application_event.fire.apply(application_event,arguments);
		};

		o.dom.insert_before(target_node,drop_marker_node);
		var position = o.dom.absolutize(target_node);
		drop_marker_node.style.width = target_offset_width + 'px';
		drop_marker_node.style.height = target_offset_height + 'px';
		drop_marker_node.className = target_node.className + ' drop_marker';
		drop_marker_node.style.visibility = 'hidden';

		target_node.style.zIndex = ++current_z_index;

		o.dom.add_class_name(target_node,'in_drag');

		starting_point_y = position.y;
		starting_point_x = position.x;

		// this is a function that will cancel everything that was setup
		cancel_active_drag = function () {
			mouse_coordinate_watcher();
			o.dom.clear_interval(update_target_position);
			o.dom.insert_before(drop_marker_node,target_node);
			o.dom.remove(drop_marker_node);
			o.dom.remove_class_name(target_node,'in_drag');
			target_node.style.width = target_node.style.height = target_node.style.position = target_node.style.top = target_node.style.left = target_node.style.margin = '';
			cancel_active_drag = undefined;
			cancel_mouseup();
			fire('on_drop',target_node,drop_marker_node);
		};

		cancel_mouseup = o.dom.event.add_listener(document,'mouseup',function (e,oe) {
			cancel_active_drag && cancel_active_drag();
		});

		mouse_coordinate_watcher = o.dom.event.add_listener(document,'mousemove',function (e,oe) {

			// update your stored stuff for next time
			var old_mouse_coordinates = current_mouse_coordinates,
			old_element_at_point = current_element_at_point;
			current_mouse_coordinates = oe.get_mouse_coordinates();
			
			// we hide the draggable over and over, otherwise we cant figure out what its over cause it shims everything!!!!??
			o.dom.hide(target_node);

			current_element_at_point = oe.get_element_from_point();

			// determine if the draggable is on a droppable and if so, move stuff
			current_element_at_point && current_element_at_point !== drop_marker_node && current_element_at_point !== old_element_at_point && o.dom.find_ancestor_or_self(current_element_at_point,function (n) {
				if (is_draggable(n) && is_droppable(n.parentNode)) {
					old_mouse_coordinates.y > current_mouse_coordinates.y ? o.dom.insert_before(n,drop_marker_node) : o.dom.insert_after(n,drop_marker_node);
					fire('
					my_on_drop_marker_move();
					return true;
				} else if (is_droppable(n)) {
					var the_one;
					if (the_one = o.dom.array(n.childNodes)[o.find](function (l) {
						return is_draggable(l) && o.dom.find_position(l).y > current_mouse_coordinates.y;
					})) {
						o.dom.insert_before(the_one,drop_marker_node);
						my_on_drop_marker_move();
						return true;
					} else {
						n.appendChild(drop_marker_node);
						my_on_drop_marker_move();
						return true;
					}
				}
			});

			o.dom.unhide(target_node);

		});

		// we constantly move the target draggable under the cursor
		update_target_position = o.dom.set_interval(function () {
			target_node.style.left = (starting_point_x + (current_mouse_coordinates.x - original_mouse_coordinates.x)) + 'px';
			target_node.style.top = (starting_point_y + (current_mouse_coordinates.y - original_mouse_coordinates.y)) + 'px';
		},wait);

	};

	o.dom.event.prevent_select(is_draggable);

	var cancel_delegate = o.dom.event.delegate({
		ancestor: document.body,
		type: 'mousedown',
		test: is_draggable,
		action: function (e,oe) {
			if (!cancel_active_drag) {
				begin_dragging({
					e: e,
					oe: oe,
					target_node: oe.delegate_target,
					mouse_coordinates: oe.get_mouse_coordinates()
				});
			}
		}
	});

	return cancel_delegate;

};
