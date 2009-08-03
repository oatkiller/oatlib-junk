//= require <oatlib-ui/reference>
//= require <dom/create_element>
//= require <call_once>
//= require <before>
//= require <dom/insert_before>
//= require <dom/hide>
//= require <dom/unhide>
//= require <dom/array>
//= require <find>
//= require <dom/remove>
//= require <dom/remove_class_name>
//= require <dom/insert_after>

o.ui.drop = function (options) {

	var target,
	current_element_at_point,
	current_mouse_coordinates,
	get_drop_marker_node = o.call_once(o.dom.create_element[o.curry]('div')),
	is_draggable = options.draggable,
	is_droppable = options.droppable;

	options.event.multi_subscribe({
		on_start_drag: function (data) {
			target = data.target;
			drop_marker_node = get_drop_marker_node();

			o.dom.insert_before(target,drop_marker_node);

			current_mouse_coordinates = data.oe.get_mouse_coordinates();

			drop_marker_node.style.width = target.offsetWidth + 'px';
			drop_marker_node.style.height = target.offsetHeight + 'px';
			drop_marker_node.className = target.className + ' drop_marker';
			drop_marker_node.style.visibility = 'hidden';

		},
		on_updated_position: function (data) {
			var old_element_at_point = current_element_at_point,
			old_mouse_coordinates = current_mouse_coordinates;
			current_mouse_coordinates = data.oe.get_mouse_coordinates();

			o.dom.hide(target);

			current_element_at_point = data.oe.get_element_from_point();

			current_element_at_point && current_element_at_point !== drop_marker_node && current_element_at_point !== old_element_at_point && o.dom.find_ancestor_or_self(current_element_at_point,function (n) {
				if (is_draggable(n) && is_droppable(n.parentNode)) {
					old_mouse_coordinates.y > current_mouse_coordinates.y ? o.dom.insert_before(n,drop_marker_node) : o.dom.insert_after(n,drop_marker_node);
					return true;
				} else if (is_droppable(n)) {
					var the_one;
					if (the_one = o.dom.array(n.childNodes)[o.find](function (l) {
						return is_draggable(l) && o.dom.find_position(l).y > current_mouse_coordinates.y;
					})) {
						o.dom.insert_before(the_one,drop_marker_node);
						return true;
					} else {
						n.appendChild(drop_marker_node);
						return true;
					}
				}
			});

			o.dom.unhide(target);

		},
		on_drop: function (data) {
			o.dom.insert_before(drop_marker_node,target);
			o.dom.remove(drop_marker_node);
			target.style.width = target.style.height = target.style.position = target.style.top = target.style.left = target.style.margin = '';

		}
	});
};

