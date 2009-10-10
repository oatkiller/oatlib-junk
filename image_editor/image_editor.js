//= require <oatlib-ui/canvas/get_context>
(function () {
	var input = document.forms[0].elements[0];
	input.value = null;
	input.onchange = function () {
		var data_url = input.files[0].getAsDataURL();
		var new_image = new Image();
		new_image.src = data_url;
		var ctx = o.ui.canvas.get_context(new_image.width,new_image.height),
		canvas = ctx.canvas;
		ctx.drawImage(new_image,0,0);
		ctx.fillStyle = 'rgba(0,0,0,.3)';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		location.href = canvas.toDataURL().replace('image/png','image/octet-stream');
	};
})();
