var V = function (x,y,z) {
	x !== undefined && (this.x = x);
	y !== undefined && (this.y = y);
	z !== undefined && (this.z = z);
};
var v = function (x,y,z) {
	return new V(x,y,z);
};

