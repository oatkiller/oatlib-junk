//= require <oatlib-ui/canvas/get_context>
//= require <each>
//= require <range>
//= require <reduce>

var ctx = o.ui.canvas.get_context(19200,12000);
ctx.translate(500,500);
ctx.scale(.35,.35);
ctx.beginPath();
ctx.moveTo(0,0);

o.range(0,6)[o.reduce](function (memo) {
	return memo.replace(/F/g,'FLFRFLF');
},'FRFRF').split('')[o.each](function (direction) {
	switch (direction) {
		case 'F': ctx.translate(5,0); break;
		case 'R': ctx.rotate(2*Math.PI/3); break;
		case 'L': ctx.rotate(-Math.PI/3); break;
	}
	ctx.lineTo(0,0);
});
ctx.stroke();
