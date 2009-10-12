//= require <klass>
//= require <combine>
var Camera = function (data) {
	// get the passed position, rotation, and viewer properties
	o.combine(this,data);
}[o.klass]({
	speed: .3,
	moveBack: function () {
		this.position.z += this.speed;
		this.position.x += this.speed * Math.sin(this.rotation.y);
	},
	moveForward: function () {
		this.position.z -= this.speed;
	},
	moveLeft: function () {
	},
	moveRight: function () {
	},
	turnRight: function (angle) {
		this.rotation.y += Math.PI / 100;
	},
	turnLeft: function (angle) {
		this.rotation.y -= Math.PI / 100;
	}
});
