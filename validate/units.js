//= require <oatlib-ui/validate/validate>
test({
	name: 'validate',
	'key is required and required fn is called with required key name, and query string obj': function () {
		var required = false,
		key = 'property',
		passed_key,
		obj = [],
		passed_obj,
		valid = o.ui.validate(obj,{
			'property': {
				required: function (my_key,my_obj) {
					required = true;
					passed_key = my_key;
					passed_obj = my_obj;
				}
			}

		});
		Assert.isFalse(valid,'the card should be invalid because the query string obj doesnt have a "property" key');
		Assert.isTrue(required,'the property shouldve been found missing and this fn shouldve been called');
		Assert.areSame(key,passed_key,'this shouldve been passed when required was called');
		Assert.areSame(obj,passed_obj,'this shouldve been passed when required was called');
	},
	'two of the pairs arent integers but are required to be: integer is called. the key, pair, and obj is passed. they arent missing, so required isnt called': function () {
		var integer_called = false,
		required_called = false,
		key = 'property',
		passed_key,
		passed_obj,
		first_offending_obj = {key: key, value: '4a'},
		passed_first_offending_obj,
		second_offending_obj = {key: key, value: 4.3},
		passed_second_offending_obj,
		obj = [{key: key, value: 1},{key: key, value: 2},first_offending_obj,second_offending_obj],
		valid = o.ui.validate(obj,{
			'property': {
				required: function () {
					required = true;
				},
				integer: function (my_key,my_obj,offending_pairs) {
					integer_called = true;
					passed_key = my_key;
					passed_obj = my_obj;
					passed_first_offending_obj = offending_pairs[0];
					passed_second_offending_obj = offending_pairs[1];
				}
			}
		});
		Assert.isFalse(valid,'the card should be invalid');
		Assert.isFalse(required_called,'the value wasnt missing so this shouldnt be called');
		Assert.isTrue(integer_called,'integer should be called because at least one pair wasnt one');
		Assert.areSame(key,passed_key,'key shouldve been passed when required was called');
		Assert.areSame(obj,passed_obj,'query_string_obj shouldve been passed when required was called');
		Assert.areSame(first_offending_obj,passed_first_offending_obj,'first_offending_obj shouldve been passed when required was called');
		Assert.areSame(second_offending_obj,passed_second_offending_obj,'second_offending_obj shouldve been passed when required was called');
	},
	'one of the pairs is required to be not longer than 6 chars, but is longer. nottolong is called, the key is passed, the query string obj is paseed. the offending pairs are passed. all the pair are integers, so integer isnt called': function () {
		var integer_called = false,
		nottolong_called = false,
		key = 'property',
		passed_key,
		passed_obj,
		first_offending_obj = {key: key, value: '1234567',},
		passed_first_offending_obj,
		second_offending_obj = {key: key, value: '789012345'},
		passed_second_offending_obj,
		obj = [{key: key, value: '1234'},{key: key, value: '343'},first_offending_obj,second_offending_obj],
		valid = o.ui.validate(obj,{
			'property': {
				required: function () {
					required = true;
				},
				integer: function () {
					integer_called = true;
				},
				max_length: 6,
				nottolong: function (my_key,my_obj,offending_pairs) {
					nottolong_called = true;
					passed_key = my_key;
					passed_obj = my_obj;
					passed_first_offending_obj = offending_pairs[0];
					passed_second_offending_obj = offending_pairs[1];
				}
			}
		});
		Assert.isFalse(valid,'the card should be invalid');
		Assert.isFalse(integer_called,'the values were integers so this shouldnt be called');
		Assert.isTrue(nottolong_called,'nottolong should be called because at least one pair was longer than 6');
		Assert.areSame(key,passed_key,'key shouldve been passed when was called');
		Assert.areSame(obj,passed_obj,'query_string_obj shouldve been passed when was called');
		Assert.areSame(first_offending_obj,passed_first_offending_obj,'first_offending_obj shouldve been passed when was called');
		Assert.areSame(second_offending_obj,passed_second_offending_obj,'second_offending_obj shouldve been passed when was called');
	},
	'works': function () {
		var valid = o.ui.validate([
			{
				"key": "card[title]",
				"value": "FFFFFFFUUUUUUUUUUUUU"
			},
			{
				"key": "card[effort]",
				"value": "4"
			},
			{
				"key": "card[color_hex]",
				"value": "ffaa00"
			},
			{
				"key": "card[body]",
				"value": "WHICH?"
			}
		]
		,{
			'card[title]': {
				required: function () {
				}
			},
			'card[effort]': {
				required: function () {
				},
				integer: function () {
				}
			},
			'card[column]': {
				integer: function () {
				}
			},
			'card[color_hex]': {
				maximum_length: 6,
				'nottolong': function () {
				}
			}
		});
		Assert.isTrue(valid,'everything was fine');
	}
});
