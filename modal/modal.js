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
	payload,
	resize_listener,
	html_class_name = 'overlayed',
	overlay_node_markup = '<div class="overlay shield"></div>',
	modal_node_markup = '<div class="overlay modalWrapper"><div class="modal"></div></div>',
	show_modal = function () {

		size_modal();

		modal_showing = true;

		$$_dom_add_class_name(html,html_class_name);

		$$_dom_set_timeout(function () {
			if (!resize_listener) {
				resize_listener = $$_dom_event_add_listener(window,'resize',$$_dom_debounce(size_modal));
			}
		},0);

	},
	size_modal = function () {
		var size = $$_dom_get_window_size();
		html.style.height = size.height + 'px';
		html.style.width = size.width + 'px';
	},
	undo_size_modal = function () {
		html.style.height = html.style.width = emptyString;
	},
	init = function () {
		overlay_node = $$_dom_node(overlay_node_markup);
		modal_node = $$_dom_node(modal_node_markup);

		body = document.body;
		html = body.parentNode;

		$$_dom_prepend_child(body,modal_node);
		$$_dom_prepend_child(body,overlay_node);

		payload = {
			overlay_node: overlay_node,
			modal_node: modal_node
		};

		init = function () {};
	};

	$$_ui_modal = $$_ui.modal = function (callback,contentNode) {

		init();

		// if the user didnt pass two args, assume the passed one is the content node
		if (arguments.length < 2) {
			contentNode = callback;
			callback = null;
		}

		var interesting_node = modal_node.firstChild;

		while (interesting_node.firstChild) {
			$$_dom_remove(interesting_node.firstChild);
		}

		interesting_node.appendChild(contentNode);

		!modal_showing && show_modal();

		callback && callback(payload);

	};

	$$_ui_hide_modal = $$_ui.hide_modal = function (callback) {

		callback && callback(payload);

		modal_showing = false;

		$$_dom_remove_class_name(html,html_class_name);

		resize_listener && resize_listener();

		undo_size_modal();

	};

})();
