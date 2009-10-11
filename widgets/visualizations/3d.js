//= require <combine>
//= require <range>
//= require <class>
//= require <map>
//= require <mask>
//= require <each>
//= require <dom/fragment>
//= require <dom/element>
//= require <oatlib-ui/widgets/visualizations/box>
//= require <oatlib-ui/widgets/visualizations/vector>
//= require <oatlib-ui/widgets/visualizations/scene>

(function () {

	var my_box = new Box(v(0,1,0),v(0,0,0),v(1,1,1));
	var my_scene = new Scene(v(200,200));
	my_scene.renderABox(my_box);

/*

	var my_2d_points = o.range(0,7)[o.map](function (i) {
		return scale(get_2d_point(
			my_box.getPoint(i),
			v(.5,.5,5),
			v(0,0,0),
			v(1,0,1)
		));
	});

	ctx.strokeStyle = 'rgba(255,0,0,.2)';

	sides[o.each](function (side) {
		var a = my_2d_points[side[0]],
		b = my_2d_points[side[1]],
		c = my_2d_points[side[2]],
		d = my_2d_points[side[3]];

		ctx.beginPath();
		ctx.moveTo(a.x,a.y);
		ctx.lineTo(b.x,b.y);
		ctx.lineTo(c.x,c.y);
		ctx.lineTo(d.x,d.y);
		ctx.stroke();

	});
	*/

	
	/*
	document.body.appendChild(o.dom.fragment('<form><fieldset><label>camera pos x: <input id="camera_pos_x" type="text" /></label><button type="submit">render</button></fieldset></form>');

	var form = document.forms[0];
	form.onsubmit = 
	*/


})();
