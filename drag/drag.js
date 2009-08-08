//= require <dom/absolutize>
//= require <oatlib-ui/reference>
//= require <dom/event/delegate>
//= require <dom/event/prevent_select>
//= require <empty_function>
//= require <application_event>

o.ui.drag = function (options) {

	// get references to options
	var is_draggable = options.draggable,
	event = options.event || {fire: empty_function},

	// set constants
	wait = 1E3 / 32,

	// scope vars
	cancel_active_drag,
	current_z_index = 1,

	// main dragging routine
	begin_dragging = function (data) {

		var target_node = data.target_node,
		starting_point_x = 0,
		starting_point_y = 0,
		original_mouse_coordinates = data.oe.get_mouse_coordinates(),
		current_mouse_coordinates = original_mouse_coordinates,
		mouse_coordinate_watcher,
		update_target_position,
		cancel_mouseup,
		try_updating_target_position = true;

		event.fire({
			type: 'on_before_start_drag',
			target: target_node,
			e: data.e,
			oe: data.oe
		});

		var position = o.dom.absolutize(target_node);

		target_node.style.zIndex = ++current_z_index;

		starting_point_y = position.y;
		starting_point_x = position.x;

		// this is a function that will cancel everything that was setup
		cancel_active_drag = function (e,oe) {
			mouse_coordinate_watcher();
			window.clearInterval(update_target_position);
			target_node.style.width = target_node.style.height = target_node.style.position = target_node.style.top = target_node.style.left = target_node.style.margin = '';
			cancel_active_drag = undefined;
			cancel_mouseup();
			event.fire({
				type: 'on_drop',
				target: target_node,
				e: e,
				oe: oe
			});

		};

		cancel_mouseup = o.dom.event.add_listener(document,'mouseup',function (e,oe) {
			cancel_active_drag && cancel_active_drag(e,oe);
		});

		mouse_coordinate_watcher = o.dom.event.add_listener(document,'mousemove',function (e,oe) {

			if (try_updating_target_position) {
				// update your stored stuff for next time
				var new_mouse_coordinates = oe.get_mouse_coordinates();

				try_updating_target_position = false; // only do this once per tick

				if (new_mouse_coordinates.x !== current_mouse_coordinates.x || new_mouse_coordinates.y !== current_mouse_coordinates.y) {
					current_mouse_coordinates = new_mouse_coordinates;

					target_node.style.left = (starting_point_x + (current_mouse_coordinates.x - original_mouse_coordinates.x)) + 'px';
					target_node.style.top = (starting_point_y + (current_mouse_coordinates.y - original_mouse_coordinates.y)) + 'px';

					event.fire({
						type: 'on_updated_position',
						target: target_node,
						e: e,
						oe: oe
					});

				}
			}

		});

		// we constantly move the target draggable under the cursor
		update_target_position = window.setInterval(function () {
			try_updating_target_position = true;
		},wait);

		event.fire({
			type: 'on_start_drag',
			target: target_node,
			e: data.e,
			oe: data.oe
		});

	};

	// prevent draggable things from being selected
	o.dom.event.prevent_select(is_draggable);

	// watch for the mousedown to begin it all
	var cancel_delegate = o.dom.event.delegate({
		ancestor: document.body,
		type: 'mousedown',
		test: is_draggable,
		action: function (e,oe) {
			if (!cancel_active_drag) {
				begin_dragging({
					e: e,
					oe: oe,
					target_node: oe.delegate_target
				});
			}
		}
	});

	return cancel_delegate;

};
