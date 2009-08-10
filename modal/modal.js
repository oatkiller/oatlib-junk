//= require <dom/add_class_name>
//= require <dom/debounce>
//= require <dom/event/add_listener>
//= require <dom/get_window_size>
//= require <dom/node>
//= require <dom/prepend_child>
//= require <dom/remove>
//= require <dom/remove_class_name>
//= require <dom/set_timeout>
//= require <oatlib-ui/reference>

// ported from old oatlib. its a little weird but the css and everything is really solid

(function () {

	var modal_showing,
	overlay_node,
	modal_node,
	html,
	body,
	resize_listener,
	html_class_name = 'overlayed',
	overlay_node_markup = '<div class="overlay shield"></div>',
	modal_node_markup = '<div class="overlay modalWrapper"><div class="modal"></div></div>',
	show_modal = function () {

		size_modal();

		modal_showing = true;

		o.dom.add_class_name(html,html_class_name);

		o.dom.set_timeout(function () {
			if (!resize_listener) {
				resize_listener = o.dom.event.add_listener(window,'resize',o.debounce(size_modal));
			}
		},0);

	},
	size_modal = function () {
		var size = o.dom.get_window_size();
		html.style.height = size.height + 'px';
		html.style.width = size.width + 'px';
	},
	undo_size_modal = function () {
		html.style.height = html.style.width = '';
	},
	init = function () {
		overlay_node = o.dom.node(overlay_node_markup);
		o.ui.modal_wrapper_node = modal_node = o.dom.node(modal_node_markup);
		o.ui.modal_node = modal_node.firstChild;

		body = document.body;
		html = body.parentNode;

		o.dom.prepend_child(body,modal_node);
		o.dom.prepend_child(body,overlay_node);

		init = function () {};
	};

	o.ui.modal = function (contentNode) {

		init();

		var interesting_node = modal_node.firstChild;

		while (interesting_node.firstChild) {
			o.dom.remove(interesting_node.firstChild);
		}

		interesting_node.appendChild(contentNode);

		!modal_showing && show_modal();

		return o.ui.hide_modal;

	};

	o.ui.hide_modal = function () {

		modal_showing = false;

		o.dom.remove_class_name(html,html_class_name);

		resize_listener && resize_listener();

		undo_size_modal();

	};

})();
