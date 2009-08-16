//= require <oatlib-ui/reference>
//= require <each>
//= require <dom/array>
//= require <supplant>
//= require <dom/remove>
(function () {

	var view = (o.ui.view = {});

	view.init = function (view_holder) {
		view_holder = o.dom.remove(view_holder);
		var get_views = (view.get_views = function () {
			var result = {}, view_name;
			o.dom.array(view_holder.childNodes)[o.each](function (node) {
				if (node.getAttribute !== undefined && (view_name = node.getAttribute('view_name'))) {
					result[view_name] = node;
				}
			});
			return result;
		}),
		views = (view.views = get_views()),
		get_empty_supplant_object = (view.get_empty_supplant_object = function (s) {
			var matches = [], my_array, obj = {};
			while (my_array = o.supplant_regex.exec(s)) {
				matches.push(my_array[1]);
			}
			matches[o.each](function (key) {
				obj[key] = '';
			});
			return obj;
		}),
		populate_view = (view.populate_view = function (name,obj) {
			var view = views[name].cloneNode(true),
			tmp = document.createElement('div');
			tmp.appendChild(view);
			obj && (tmp.innerHTML = tmp.innerHTML[o.supplant](obj));
			tmp.innerHTML = tmp.innerHTML[o.supplant](get_empty_supplant_object(tmp.innerHTML));
			return tmp.firstChild;
		});
	};
})();
