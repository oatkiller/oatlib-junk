//= require <oatlib-ui/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <each>
o.ui.bezier = function () {
	var ctx = o.ui.get_context(400,400);
	new Array(4)[o.each](function (i) {
		alert(i);
	});
};
