//= require <oatlib-ui/reference>
//= require <curry>
//= require <dom/absolutize>
//= require <dom/insert_after>
//= require <dom/set_opacity>
//= require <dom/find_position>
//= require <dom/element>
//= require <combine>
o.ui.blur = function (matrix,node) {
	var clones = [], i = 0, length = matrix.length, clone, properties, position = o.dom.find_position(node), fragment = document.createDocumentFragment();
	for (; i < length; i++) {
		clone = node.cloneNode(true);
		properties = matrix[i];
		o.dom.set_opacity(clone,properties.o * 10);
		o.combine(clone.style,{
			left: position.x + properties.x + 'px',
			top: position.y + properties.y + 'px',
			position: 'absolute'
		});
		clones.push(clone);
		fragment.appendChild(clone);
	}
	document.body.appendChild(fragment);
	node.style.visibility = 'hidden';
};
var a = 1 / 16,
		b = 2 * a,
		c = 2 * b,
		m = function (x,y,o) {
			return {
				x: x,
				y: y,
				o: o
			};
		},
		gaussian_blur = o.ui.blur[o.curry]([
			m(-1,-1,a),m(0,-1,b),m(1,-1,a),
			m(-1,0,b),m(0,0,c),m(1,0,b),
			m(-1,1,a),m(0,1,b),m(1,1,a)
		]);
		console.log(a,b,c);

gaussian_blur(o.dom.element('blur_me'));


