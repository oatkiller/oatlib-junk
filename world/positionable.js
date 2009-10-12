//= require <oatlib-ui/world/reference>
//= require <klass>

o.ui.world.Positionable = function (position,rotation) {
	this.position = o.combine({},position);
	this.rotation = o.combine({},rotation);
}[o.klass]({
	onChange: function () {},
	moveForward: function (distance) {
		this.position.x = distance * Math.cos(this.rotation.y);
		this.position.y = distance * Math.sin(this.rotation.y);
		this.onChange();
	},
	turnLeft: function (radians) {
		this.rotation.y -= radians;
		this.onChange();
	},
	turnRight: function (radians) {
		this.rotation.y += radians;
		this.onChange();
	}
});
