//= require <oatlib-ui/reference>
//= require <dom/update>
//= require <each>
(function () {
	var mvc = (o.ui.mvc = {}),
	outlets = (mvc.outlets = {}),
	get_outlets_by_key = (mvc.get_outlets_by_key = function (key) {
		return outlets[key] || (outlets[key] = []);
	}),
	output = (mvc.output = function (key,fragment) {
		var nodes;
		if (outlets = get_outlets_by_key(key)) {
			o.each(outlets,function (outlet) {
				outlet.update && outlet.update(fragment) || o.dom.update(outlet.node,fragment);
			});
		}
	}),
	register_outlet = (mvc.register_outlet = function (key,node,update) {
		get_outlets_by_key(key).push({
			node: node,
			update: update
		});
	}),
	notify = (mvc.notify = function (node) {

	});
})();
