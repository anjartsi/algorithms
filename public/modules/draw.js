$(document).ready(function() {
	let canvas = $('canvas')[0];

	let ctx = canvas.getContext('2d');
	canvas.width = $(canvas).width();
	$(canvas).height(canvas.width / 2);
	canvas.height = $(canvas).height();
	ctx.fillRect(0, 0, 200, 100);
});