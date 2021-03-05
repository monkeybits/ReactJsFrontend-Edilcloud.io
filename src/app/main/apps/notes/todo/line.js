import Konva from 'konva';

export const addLine = (stage, layer, mode = 'brush') => {
	let isPaint = false;
	let lastLine;
	stage.on('mousedown touchstart', function (e) {
		isPaint = true;
		// let pos = stage.getPointerPosition();
		const oldScale = stage.scaleX();
		const mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
		};
		lastLine = new Konva.Line({
			stroke: mode == 'brush' ? 'red' : 'white',
			strokeWidth: mode == 'brush' ? 5 : 20,
			globalCompositeOperation: mode === 'brush' ? 'source-over' : 'destination-out',
			points: [mousePointTo.x, mousePointTo.y],
			draggable: mode == 'brush'
		});
		layer.add(lastLine);
	});
	stage.on('mouseup touchend', function () {
		isPaint = false;
	});
	stage.on('mousemove touchmove', function () {
		if (!isPaint) {
			return;
		}
		// const pos = stage.getPointerPosition();
		const oldScale = stage.scaleX();
		const mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
		};
		const newPoints = lastLine.points().concat([mousePointTo.x, mousePointTo.y]);
		lastLine.points(newPoints);
		layer.batchDraw();
	});
};
