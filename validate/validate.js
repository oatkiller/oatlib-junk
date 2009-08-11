//= require <each>
//= require <filter>
//= require <empty_function>
//= require <oatlib-ui/reference>
var get_pairs_by_key = function (query_string_obj,key) {
	return query_string_obj[o.filter](function (pair) {
		return pair.key === key;
	});
};
o.ui.validate = function (query_string_obj,validation_data) {
	var pairs, valid = true, get_offenders;

	o.each(validation_data,function (requirements,key_name) {
		pairs = get_pairs_by_key(query_string_obj,key_name);
		get_offenders = function (test,callback) {
			var offenders = o.filter(pairs,test);
			if (offenders.length) {
				offenders.length && callback.call(requirements,key_name,query_string_obj,offenders);
				valid = false;
			}
		};
		if (requirements.required && pairs.length === 0) {
			requirements.required(key_name,query_string_obj);
			valid = false;
		}
		if (requirements.integer) {
			get_offenders(function (pair) {
				var value = pair.value;
				return /\D/.test(value);
			},requirements.integer);
		}
		if (requirements.nottolong && requirements.max_length) {
			var max_length = requirements.max_length;
			get_offenders(function (pair) {
				return pair.value.length > max_length;
			},requirements.nottolong);
		}
	});

	return valid;
};
