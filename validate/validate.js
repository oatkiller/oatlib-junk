//= require <each>
//= require <array>
//= require <filter>
//= require <empty_function>
//= require <oatlib-ui/reference>
var get_pairs_by_key = function (query_string_obj,key) {
	return query_string_obj[o.filter](function (pair) {
		return pair.key === key;
	});
};
o.ui.validate = function (query_string_obj,validation_data) {
	var valid = true;

	o.each(validation_data,function (requirements,key_name) {
		var pairs = get_pairs_by_key(query_string_obj,key_name);
		return o.each(requirements,function (action,request_key) {
			var result,
			callback = function (offenders) {
				valid = false;
				if (action.call(requirements,key_name,offenders,query_string_obj) === false) {
					result = o.each_break;
				}
			}, get_offenders = function (test) {
				var offenders = o.filter(pairs,test);
				offenders.length && callback(offenders);
			};
			var fn = ({
				required: function () {
					if (pairs.length === 0) {
						callback([]);
						valid = false;
					}
				},
				integer: function () {
					get_offenders(function (pair) {
						var value = pair.value;
						return (/\D/).test(value);
					},action);
				},
				nottolong: function () {
					if (requirements.max_length) {
						var max_length = requirements.max_length;
						get_offenders(function (pair) {
							return pair.value.length > max_length;
						},action);
					}
				}
			})[request_key];
			fn && fn();
			return result;
		});
	});

	return valid;
};
