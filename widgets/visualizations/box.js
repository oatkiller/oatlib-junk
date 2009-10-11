//= require <combine>
//= require <klass>
//= require <map>
//= require <mask>

var Box = function (position,rotation,size) {
	o.combine(this,{position: position,rotation: rotation,size: size});
}[o.klass]({
	getPoint: function (i) {
		var point = o.mask(this.position);
		switch (i) {
			case 0: break;
			case 1: this.accomodateForZ(point); break;
			case 2: this.accomodateForZ(point); this.accomodateForY(point); break;
			case 3: this.accomodateForY(point); break;
			case 4: this.accomodateForX(point); break;
			case 5: this.accomodateForZ(point); this.accomodateForX(point); break;
			case 6: this.accomodateForZ(point); this.accomodateForX(point); this.accomodateForY(point); break;
			case 7: this.accomodateForX(point); this.accomodateForY(point); break;
		}
		return point;
	},
	accomodateForX: function (point) {
		point.x += this.size.x;
		return point;
	},
	accomodateForY: function (point) {
		point.y -= this.size.y;
		return point;
	},
	accomodateForZ: function (point) {
		point.z += this.size.z;
		return point;
	},
	getSide: function (i) {
		var that = this;
		return [
			[0,1,2,3],
			[0,3,7,4],
			[4,5,6,7],
			[1,5,6,2],
			[1,0,4,5],
			[2,3,7,6]
		][i][o.map](function (point) {
			return that.getPoint(point);
		});
	}
});

