//= require <oatlib-ui/widgets/visualizations/box>
//= require <oatlib-ui/widgets/visualizations/vector>
//= require <oatlib-ui/widgets/visualizations/scene>
//= require <dom/element>
//= require <dom/fragment>
//= require <dom/event/add_listener>

(function () {

	var my_box = new Box(v(0,1,0),v(0,0,0),v(1,1,1));
	var my_scene = new Scene(v(600,600));
	var render = function () {
		my_scene.ctx.clearRect(0,0,my_scene.ctx.canvas.width,my_scene.ctx.canvas.height);
		my_scene.renderABox(my_box);
	};
	render();

	var moving = {
		forward: false,
		left: false,
		back: false,
		right: false
	};

	o.dom.event.add_listener(document,'keydown',function (e,oe) {
		var key = oe.get_key().key;
		switch (key) {
			case 81: // Q
				moving.turn_left = true;
				break;
			case 69: // E
				moving.turn_right = true;
				break;
			case 87: // W
				moving.forward = true;
				break;
			case 65: // A
				moving.left = true;
				break;
			case 83: // S
				moving.back = true;
				break;
			case 68: // D
				moving.right = true;
				break;
		}
	});


	o.dom.event.add_listener(document,'keyup',function (e,oe) {
		var key = oe.get_key().key;
		switch (key) {
			case 81: // Q
				moving.turn_left = false;
				break;
			case 69: // E
				moving.turn_right = false;
				break;
			case 87: // W
				moving.forward = false;
				break;
			case 65: // A
				moving.left = false;
				break;
			case 83: // S
				moving.back = false;
				break;
			case 68: // D
				moving.right = false;
				break;
		}
	});

	var speed = .03;

	// these are wrong cause the whole orientation is wrong
	setTimeout(function () {
		if (moving.turn_left) {
			my_scene.camera.rotation.y -= speed;
		}
		if (moving.turn_right) {
			my_scene.camera.rotation.y += speed;
		}
		if (moving.forward) {
			my_scene.camera.position.z -= speed;
		}
		if (moving.back) {
			my_scene.camera.position.z += speed;
		}
		if (moving.left) {
			my_scene.camera.position.x += speed;
		}
		if (moving.right) {
			my_scene.camera.position.x -= speed;
		}
		setTimeout(arguments.callee,1E3 / 100);
	},1E3 / 100);

	setTimeout(function () {
		render();
		setTimeout(arguments.callee,1E3 / 33);
	},1E3 / 33);

})();
