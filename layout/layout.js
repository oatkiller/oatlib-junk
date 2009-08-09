//= require <oatlib-ui/reference>
//= require <dom/element>
//= require <dom/hide>
//= require <dom/unhide>
//= require <dom/event/add_listener>
//= require <dom/debounce>
//= require <dom/is_node>
//= require <dom/capacitate>
(function () {
 	var nodes = (o.ui.auto_layout_nodes = []),
	handler = (o.ui.auto_layout_handler = function (my_node) {
		my_nodes = o.dom.is_node(my_node) ? [my_node] : nodes;
		my_nodes[o.each](o.dom.hide);
		window.setTimeout(function () {
			my_nodes[o.each](function (node) {
				console.log('resizing: ',node);
				if (node.parentNode) {
					node.style.height = node.parentNode.offsetHeight + 'px';
					o.dom.unhide(node);
				}
			});
		},0);
	});
	o.ui.auto_layout = (function (node) {
		nodes.push(node);
		o.ui.auto_layout_handler();
		return function () {
			nodes.splice(nodes[o.indexOf](node),1);
			return true;
		};
	})[o.capacitate](0);
	o.dom.event.add_listener(window,'resize',o.ui.auto_layout_handler[o.debounce]());
})();
