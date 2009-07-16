//= require <dom/absolutize>
//= require <dom/clear_interval>
//= require <dom/event/delegate>
//= require <dom/event/prevent_select>
//= require <dom/find_ancestor_or_self>
//= require <dom/get_element_at_point>
//= require <dom/get_style>
//= require <dom/has_class_name>
//= require <dom/hide>
//= require <dom/insert_after>
//= require <dom/insert_before>
//= require <dom/node>
//= require <dom/remove>
//= require <dom/set_interval>
//= require <dom/unhide>
//= require <empty_function>
//= require <return_false>

var active_drag,
current_z_index = 1,
parse_pixel_value = function (value) {
	var minus_px = value.replace(/px$/);
	if (value !== minus_px) {
		return parseFloat(minus_px);
	}
	return false;
},
wait = 1E3 / 32,
prepare = function () {
	canceler = $$_dom_event_add_listener(document,$mouseup,function (e,oe) {
		active_drag && active_drag();
	});

	prepare = $$_empty_function;
},
begin_dragging = function (data) {

	prepare();

	var target = data.target,
	original_left = 0,
	original_top = 0,
	get_style = $$_dom_get_style[$$_o$curry](target),
	original_mouse_coordinates = data.mouse_coordinates,
	current_mouse_coordinates = original_mouse_coordinates,
	current_element_at_point,
	mouse_coordinate_watcher,
	interval,
	canceler,
	offsetWidth = target.offsetWidth,
	offsetHeight = target.offsetHeight,
	fake = $$_dom_node('<div></div>');

	$$_dom_insert_before(target,fake);
	var position = $$_dom_absolutize(target);
	fake.style.width = offsetWidth + 'px';
	fake.style.height = offsetHeight + 'px';

	target.style.zIndex = ++current_z_index;

	original_top = position.y;
	original_left = position.x;

	active_drag = function () {
		mouse_coordinate_watcher();
		$$_dom_clear_interval(interval);
		$$_dom_insert_before(fake,target);
		$$_dom_remove(fake);
		target.style.position = target.style.top = target.style.left = emptyString;
		active_drag = undefined;
	};

	mouse_coordinate_watcher = $$_dom_event_add_listener(document,$mousemove,function (e,oe) {
		var old_mouse_coordinates = current_mouse_coordinates,
		old_element_at_point = current_element_at_point;
		current_mouse_coordinates = oe.get_mouse_coordinates();
		$$_dom_hide(target);

		current_element_at_point = $$_dom_get_element_at_point(current_mouse_coordinates);

		current_element_at_point && current_element_at_point !== fake && current_element_at_point !== old_element_at_point && $$_dom_find_ancestor_or_self(current_element_at_point,function (n) {
			if ($$_dom_has_class_name(n,'draggable')) {
				old_mouse_coordinates.y > current_mouse_coordinates.y ? $$_dom_insert_before(n,fake) : $$_dom_insert_after(n,fake);
				return true;
			} else if ($$_dom_has_class_name(n,'droppable')) {
				n.appendChild(fake);
				return true;
			}
		});

		$$_dom_unhide(target);
	});

	interval = $$_dom_set_interval(function () {
		target.style.left = (original_left + (current_mouse_coordinates.x - original_mouse_coordinates.x)) + 'px';
		target.style.top = (original_top + (current_mouse_coordinates.y - original_mouse_coordinates.y)) + 'px';
	},wait);

},
is_draggable = function (n) {
	return $$_dom_has_class_name(n,$draggable);
};

$$_dom_event_prevent_select(is_draggable);
$$_dom_event_delegate({
	ancestor: document[$body],
	type: $mousedown,
	test: is_draggable,
	action: function (e,oe) {
		if (!active_drag) {
			begin_dragging({
				target: oe.delegate_target,
				mouse_coordinates: oe.get_mouse_coordinates()
			});
		}
	}
});
