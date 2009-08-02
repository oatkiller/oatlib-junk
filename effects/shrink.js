//= require <oatlib-ui/effects/reference>
//= require <oatlib-ui/transition/sine_ease_in_out>
//= require <oatlib-ui/transition/transition>
//= require <dom/find_position>
//= require <dom/hide>
//= require <dom/unhide>
//= require <dom/remove_class_name>
//= require <curry>
//= require <dom/add_class_name>

(function () {

	var speed = .1E3,
	tween = o.ui.sine_ease_in_out,
	shrink_state_property = o.qname('shrink_state'),
	shrink_state_classes = {
		'shrinking': 'shrinking',
		'shrunken': 'shrunken',
		'unshrinking': 'unshrinking'
	},
	set_height = function (node,h) { // floor the height, concat it with 'px', and set it to the node.style.height property
		node.style.height = Math.floor(h) + 'px';
	},
	get_shrink_state = function (node) { // if a shrink state was set on the node return that, otherwise null
		return shrink_state_property in node && node[shrink_state_property] || null;
	},
	set_shrink_state = function (node,state) { // get the current shrink state. if thats not null, remove the correspodning classname from the node. if the current state isnt null then add the corresponding classname to the node. set the state on the node
		var current_shrink_state = get_shrink_state(node);
		current_shrink_state !== null && o.dom.remove_class_name(node,shrink_state_classes[current_shrink_state]);
		state !== null && o.dom.add_class_name(node,shrink_state_classes[state]);
		node[shrink_state_property] = state;
	},
	shrink_height_property_name = o.qname('shrink_height'),
	get_node_height_and_record_it_on_node = function (node) { // get the height, store it on the node. return the height
		return (node[shrink_height_property_name] = o.dom.find_position(node).get_height());
	},
	get_and_delete_node_height_from_record = function (node) { // get the height from the nodes record. delete the record. return the height
		var height = node[shrink_height_property_name];
		delete node[shrink_height_property_name];
		return height;
	},
	clear_height = function (node) { // reset the nodes height
		node.style.height = '';
	};

	o.ui.effects.shrink = function (data) {

		var node = data.node,
		on_complete = data.on_complete;

		if (get_shrink_state(node) !== null) {
			return false;
		}

		set_shrink_state(node,'shrinking');
		var height = get_node_height_and_record_it_on_node(node);

		return o.ui.transition({
			start: height,
			end: 0,
			duration: data.duration || speed,
			tween: data.tween || tween,
			on_complete: function () {
				set_shrink_state(node,'shrunken');
				clear_height(node);
				o.dom.hide(node);
				on_complete && on_complete();
			},
			callback: set_height[o.curry](node)
		});

	};

	o.ui.effects.unshrink = function (data) {
		
		var node = data.node,
		on_complete = data.on_complete;

		if (get_shrink_state(node) !== 'shrunken') {
			return false;
		}

		set_shrink_state(node,'unshrinking');

		return o.ui.transition({
			start: 0,
			end: get_and_delete_node_height_from_record(node),
			duration: data.duration || speed,
			tween: data.tween || tween,
			on_start: data.on_start || function () {
				o.dom.unhide(node);
			},
			on_complete: function () {
				set_shrink_state(node,null);
				clear_height(node);
				on_complete && on_complete();
			},
			callback: set_height[o.curry](node)
		});

	};

})();
