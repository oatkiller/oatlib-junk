//= require <oatlib-ui/widgets/visualizations/reference>
//= require <oatlib-ui/canvas/get_context>
//= require <each>
//= require <reduce>
//= require <supplant>
o.ui.widgets.visualizations.pie_chart = function (data) {
	var width = data.width, height = data.height, radius = (width / 2) * .8;
	var ctx = o.ui.canvas.get_context(width,height),
	total = data.series[o.reduce](function (total,my_series) {
		return total + my_series.values[0];
	},0),
	current_angle = 0;
	ctx.translate(width / 2, height / 2);
	data.series[o.each](function (my_series) {
		console.group('series');
		console.log('begining path');
		ctx.beginPath();
		ctx.fillStyle = 'hsl({h},{s}%,{l}%)'[o.supplant]({
			h: current_angle / Math.PI * 2 * 360,
			s: 100,
			l: 50
		});
		console.log('moving to 0,0');
		ctx.moveTo(0,0);
		//console.log('drawing a line to -r (',-radius,'), 0');
		//ctx.lineTo(-radius,0);
		console.log('getting the value (',my_series.values[0],'), / total (',total,' * math.pi * 2');
		var series_worth = (my_series.values[0] / total) * (Math.PI * 2);
		console.log('drawing an arc with a center at 0,0. begin angle at 0, end angle at series_worth (',series_worth,')');
		ctx.arc(0,0,radius,0,series_worth,false);
		console.log('stroking');
		ctx.fill();
		ctx.fillStyle = '#000';
		ctx.fillText(my_series.label,5,-radius / 2);
		console.log('rotating by series_worth (',series_worth,')');
		ctx.rotate(series_worth);
		current_angle += series_worth;
		console.groupEnd('series');
	});
	return ctx.canvas;
};
o.ui.widgets.visualizations.pie_chart({
	width: 200,
	height: 200,
	series: [
		{label: 'work', values: [1]},
		{label: 'eat', values: [1]},
		{label: 'commute', values: [1]},
		{label: 'watch tv', values: [1]},
		{label: 'sleep', values: [1]}
	]
});
