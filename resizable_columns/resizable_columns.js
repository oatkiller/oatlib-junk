//= require <oatlib-ui/reference>
//= require <dom/event/delegate>
//= require <dom/debounce>
//= require <dom/has_class_name>
//= require <dom/find_position>
//= require <dom/event/prevent_select>
//= require <dom/set_interval>
//= require <dom/clear_interval>
//= require <math/floor>

var bound = function (n,l,u) {
	return n < l ? l : n > u ? u : n;
},
min_pane_width = 150;

$$_ui_resizable_columns = $$_ui.resizable_columns = function () {

	var panes_i_ever_resized = [],
	begin_resize = function (pane,mouse_coordinates) {
		var current_mouse_coordinates = {
			y: mouse_coordinates.y,
			x: mouse_coordinates.x
		},
		next_pane = (function (pane) {
			var next = pane.nextSibling;
			return $$_dom_has_class_name(next,'resizable_column') && next || arguments.callee(next);
		})(pane),
		cancel = $$_dom_set_interval(function () {

			var left_pane_rect = $$_dom_find_position(pane).rect,
			right_pane_rect = $$_dom_find_position(next_pane).rect,
			left_pane_max = right_pane_rect.right - min_pane_width,
			adjusted_mouse_coordinate = bound(current_mouse_coordinates.x,left_pane_rect.left + min_pane_width,right_pane_rect.right - min_pane_width),
			left_pane_width = bound($$_floor(adjusted_mouse_coordinate - left_pane_rect.left),min_pane_width,left_pane_max);
			var right_pane_width = $$_floor(right_pane_rect.right - (left_pane_rect.left + left_pane_width));

			right_pane_width = right_pane_width < min_pane_width ? min_pane_width : right_pane_width;

			pane.style.width = left_pane_width + 'px';
			next_pane.style.width = right_pane_width + 'px';

		},1E3 / 32),
		me_too = $$_dom_event_add_listener(document,'mousemove',function (e,oe) {
			current_mouse_coordinates = oe.get_mouse_coordinates();
		});
		$$_dom_event_add_listener(document,'mouseup',function (e,oe) {
			$$_dom_clear_interval(cancel);
			me_too();
		});
		panes_i_ever_resized.push(pane,next_pane);
	};

	var is_resizable_column_handle = function (n) {
		return o.dom.has_class_name(n,'resizable_column_handle');
	};

	$$_dom_event_prevent_select(is_resizable_column_handle);

	o.dom.event.delegate({
		type: 'mousedown',
		test: is_resizable_column_handle,
		action: function (e,oe) {
			return begin_resize(oe.delegate_target.parentNode,oe.get_mouse_coordinates());
		}
	});

	o.dom.event.add_listener(window,'resize',o.dom.debounce(function () {
		panes_i_ever_resized[o.each](function (pane) {
			pane.style.width = '';
		});
		panes_i_ever_resized = [];
	}));

};
