import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CanvasDraw from 'react-canvas-draw';
import React, { useState, useRef, useEffect } from 'react';

import { Stage, Layer } from 'react-konva';
import Rectangle from './Rectangle';
import { addLine } from './line';
import { addTextNode } from './textNode';
import Image from './Image';
import { Button, ButtonGroup } from '@material-ui/core';

const uuidv1 = require('uuid/v1');

export default function DrawImage({ open, onClose, imgSrc, replaceUrl }) {
	const [rectangles, setRectangles] = useState([]);
	const [images, setImages] = useState([]);
	const [selectedId, selectShape] = useState(null);
	const [shapes, setShapes] = useState([]);
	const [, updateState] = React.useState();
	const stageEl = React.createRef();
	const layerEl = React.createRef();
	const fileUploadEl = React.createRef();
	const getRandomInt = max => {
		return Math.floor(Math.random() * Math.floor(max));
	};
	useEffect(() => {
		const id = uuidv1();
		images.push({
			content: imgSrc,
			id
		});
		setImages(images);
		shapes.push(id);
		setShapes(shapes);
		forceUpdate();
		return () => {
			setShapes([]);
			setImages([]);
		};
	}, []);

	const addRectangle = () => {
		const rect = {
			x: getRandomInt(100),
			y: getRandomInt(100),
			width: 100,
			height: 100,
			fill: 'red',
			id: `rect${rectangles.length + 1}`
		};
		const rects = rectangles.concat([rect]);
		setRectangles(rects);
		const shs = shapes.concat([`rect${rectangles.length + 1}`]);
		setShapes(shs);
	};

	const drawLine = () => {
		addLine(stageEl.current.getStage(), layerEl.current);
	};
	const eraseLine = () => {
		addLine(stageEl.current.getStage(), layerEl.current, 'erase');
	};
	const drawText = () => {
		const id = addTextNode(stageEl.current.getStage(), layerEl.current);
		const shs = shapes.concat([id]);
		setShapes(shs);
	};
	const drawImage = () => {
		fileUploadEl.current.click();
	};
	const forceUpdate = React.useCallback(() => updateState({}), []);
	// const fileChange = ev => {
	// 	let file = ev.target.files[0];
	// 	let reader = new FileReader();
	// 	reader.addEventListener(
	// 		'load',
	// 		() => {
	// 			const id = uuidv1();
	// 			images.push({
	// 				content: imgSrc,
	// 				id
	// 			});
	// 			setImages(images);
	// 			fileUploadEl.current.value = null;
	// 			shapes.push(id);
	// 			setShapes(shapes);
	// 			forceUpdate();
	// 		},
	// 		false
	// 	);
	// 	if (file) {
	// 		reader.readAsDataURL(file);
	// 	}
	// };
	const undo = () => {
		const lastId = shapes[shapes.length - 1];

		let index = rectangles.findIndex(r => r.id == lastId);
		if (index != -1) {
			rectangles.splice(index, 1);
			setRectangles(rectangles);
		}
		index = images.findIndex(r => r.id == lastId);
		if (index != -1) {
			images.splice(index, 1);
			setImages(images);
		}
		shapes.pop();
		setShapes(shapes);
		forceUpdate();
	};
	document.addEventListener('keydown', ev => {
		if (ev.code == 'Delete') {
			let index = rectangles.findIndex(r => r.id == selectedId);
			if (index != -1) {
				rectangles.splice(index, 1);
				setRectangles(rectangles);
			}
			index = images.findIndex(r => r.id == selectedId);
			if (index != -1) {
				images.splice(index, 1);
				setImages(images);
			}
			forceUpdate();
		}
	});
	const convertosvg = () => {
		var dataURL = stageEl.current.getStage().toDataURL({ pixelRatio: 2 });
		replaceUrl(dataURL);
		onClose();
		// downloadURI(dataURL, 'stage.png');
	};
	const downloadURI = (uri, name) => {
		// var link = document.createElement('a');
		// link.download = name;
		// link.href = uri;
		// document.body.appendChild(link);
		// link.click();
		// document.body.removeChild(link);
	};
	return (
		<Dialog open={open} onClose={onClose} fullWidth className="rs-dialog-sm-full">
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<div className="absolute right-0 mr-4">
						<IconButton onClick={onClose} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
					<Typography variant="subtitle1" color="inherit">
						Draw Image
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }} className="zoom-125">
				<ButtonGroup>
					<Button variant="secondary" onClick={addRectangle}>
						Rectangle
					</Button>
					<Button variant="secondary" onClick={drawLine}>
						Line
					</Button>
					<Button variant="secondary" onClick={eraseLine}>
						Erase
					</Button>
					<Button variant="secondary" onClick={drawText}>
						Text
					</Button>
					{/* <Button variant="secondary" onClick={drawImage}>
						Image
					</Button> */}
					<Button variant="secondary" onClick={undo}>
						Undo
					</Button>
				</ButtonGroup>
				{/* <input style={{ display: 'none' }} type="file" ref={fileUploadEl} onChange={fileChange} /> */}
				<Stage
					zIndex={5}
					width="400"
					height="400"
					ref={stageEl}
					onMouseDown={e => {
						// deselect when clicked on empty area
						const clickedOnEmpty = e.target === e.target.getStage();
						if (clickedOnEmpty) {
							selectShape(null);
						}
					}}
				>
					<Layer ref={layerEl}>
						{rectangles.map((rect, i) => {
							return (
								<Rectangle
									key={i}
									shapeProps={rect}
									isSelected={rect.id === selectedId}
									onSelect={() => {
										selectShape(rect.id);
									}}
									onChange={newAttrs => {
										const rects = rectangles.slice();
										rects[i] = newAttrs;
										setRectangles(rects);
									}}
								/>
							);
						})}

						{images.map((image, i) => {
							return (
								<Image
									key={i}
									imageUrl={image.content}
									isSelected={image.id === selectedId}
									onSelect={() => {
										selectShape(image.id);
									}}
									onChange={newAttrs => {
										const imgs = images.slice();
										imgs[i] = newAttrs;
									}}
								/>
							);
						})}
					</Layer>
				</Stage>
			</DialogContent>
			<Button onClick={convertosvg}>save</Button>
		</Dialog>
	);
}
