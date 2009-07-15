//= require <dom/clear_interval>
//= require <return_false>
//= require <dom/event/delegate>
//= require <dom/event/delegate>
//= require <dom/find_node_position>
//= require <dom/get_node_style>
//= require <dom/has_class_name>
//= require <dom/set_interval>
//= require <dom/find_ancestor_or_self>
//= require <empty_function>
//= require <dom/event/prevent_select>

var active_drag,
current_z_index = 1,
parse_pixel_value = function (value) {
	var minus_px = value[$replace](/px$/);
	if (value !== minus_px) {
		return $$parseFloat(minus_px);
	}
	return false;
},
wait = 1E3 / 12,
prepare = function () {
	// capture mouseup to end this
	canceler = $$_dom_event_add_listener($$document,$mouseup,function (e,oe) {
		active_drag && active_drag();
	});

	prepare = $$_empty_function;
},
begin_dragging = function (data) {

	prepare();

	var target = data[$target],
	original_left = 0,
	original_top = 0,
	get_style = $$_dom_get_node_style[$$_o$curry](target),
	current_mouse_coordinates =
	original_mouse_coordinates = data[$mouse_coordinates],
	mouse_coordinate_watcher,
	interval,
	canceler;

	target[$style][$zIndex] = ++current_z_index;

	var current_style_position_value = get_style($position);
	//console.log('current_style_position_value: ',current_style_position_value);
	if (current_style_position_value === $static) {
		// if static, set to relative
		target[$style][$position] = $relative;
		//console.log('setting to relative');
	} else {
		// otherwise consider original left and top values
		original_left = parse_pixel_value(get_style($left)) || original_left;
		original_top = parse_pixel_value(get_style($top)) || original_top;
		//console.log('original_left: ',original_left,' original_top: ',original_top);
	}

	active_drag = function () {
		//console.log('canceling mouse coordinate watcher');
		mouse_coordinate_watcher();
		//console.log('clearing the interval');
		$$_dom_clear_interval(interval);
		//console.log('setting active drag to undefined');
		active_drag = undefined;
	};

	// capture mouse position
	mouse_coordinate_watcher = $$_dom_event_add_listener($$document,$mousemove,function (e,oe) {
		//console.log('watching mouse coordinates');
		current_mouse_coordinates = oe[$get_mouse_coordinates]();
	});

	// each time
	interval = $$_dom_set_interval(function () {
		// update the node to the offset + the original left and top values
		//console.log('updating node position');
		target[$style][$left] = (original_left + (current_mouse_coordinates[$x] - original_mouse_coordinates[$x])) + 'px';
		target[$style][$top] = (original_top + (current_mouse_coordinates[$y] - original_mouse_coordinates[$y])) + 'px';
	},wait);

},
var is_draggable = function (n) {
	return $$_dom_has_class_name(n,$draggable);
};

$$_dom_event_prevent_select(is_draggable);
$$_dom_event_delegate({
	ancestor: $$document[$body],
	type: $mousedown,
	test: is_draggable,
	action: function (e,oe) {
		if (!active_drag) {
			begin_dragging({
				target: oe[$delegate_target],
				mouse_coordinates: oe[$get_mouse_coordinates]()
			});
		}
	}
});
