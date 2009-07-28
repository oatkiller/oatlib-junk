//= require <oatlib-ui/resizable_table>
//= require <dom/has_class_name>
$$_ui_resizable_table({
	handle: function (n) {
		return n.tagName && $$_dom_is_tag_name(n,'TD') && $$_dom_has_class_name(n,'handle');
	},
	column: function (n) {
		return n.tagName && $$_dom_is_tag_name(n,'TD') && !$$_dom_has_class_name(n,'handle');
	}
});
