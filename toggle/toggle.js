//= require <oatlib-ui/reference>
//= require <curry>
// turns out this function is terrible. dunno what i was thinking
o.ui.toggle = function (node,property_name,value) {
	var toggle_name = o.qname('toggle:::'+name),
	new_value = value || node[toggle_name];
	node[toggle_name] = node[property_name];
	node[property_name] = new_value;
	return o.ui.toggle[o.curry](node,property_name);
};
