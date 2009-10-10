//= require <range>
//= require <reduce>
alert('hi');
var robs_good_ass_table_data = o.range(0,10)[o.reduce](function (ra,i) {
	ra.push({
		'0': '0',
		'1': '1',
		'2': '2',
		'3': '3',
		'4': '4',
		'5': '5'
	});
	return ra;
},[]);
console.log(robs_good_ass_table_data);
