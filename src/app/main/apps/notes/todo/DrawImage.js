import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useRef, useEffect } from 'react';

import { Stage, Layer } from 'react-konva';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, ButtonGroup, Modal } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import Rectangle from './Rectangle';
import { addLine } from './line';
import { addTextNode } from './textNode';
import Image from './Image';

const uuidv1 = require('uuid/v1');

function DrawImage({ open, onClose, imgSrc, replaceUrl, width, height }) {
	const [stageScale, setStageScale] = useState([1]);
	const [stageX, setStageX] = useState([0]);
	const [stageY, setStageY] = useState([0]);
	const [rectangles, setRectangles] = useState([]);
	const [circles, setCircles] = useState([]);
	const [images, setImages] = useState([]);
	const [selectedId, selectShape] = useState(null);
	const [shapes, setShapes] = useState([]);
	const [, updateState] = React.useState();
	let stageEl = React.createRef();
	const layerEl = React.createRef();
	const fileUploadEl = React.createRef();
	let imageRef = React.useRef();
	const [imageProps, setImageProps] = useState({
		height: 0,
		width: 0
	});
	const getRandomInt = max => {
		return Math.floor(Math.random() * Math.floor(max));
	};
	const forceUpdate = React.useCallback(() => updateState({}), []);
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
	}, [imgSrc]);

	const saveImageWidthHeight = imageProps => {
		setImageProps({
			width: imageProps.width,
			height: imageProps.height
		});
	};

	React.useEffect(() => {
		console.log('image', imageProps);
	}, [imageProps]);

	const handleWheel = e => {
		e.evt.preventDefault();

		const scaleBy = 1.01;
		const stage = e.target.getStage();
		const oldScale = stage.scaleX();
		const mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
		};

		const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

		setStageScale(newScale);
		setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
		setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
	};
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
	const addCircle = () => {
		const circ = {
			x: getRandomInt(100),
			y: getRandomInt(100),
			width: 100,
			height: 100,
			fill: 'red',
			id: `circ${circles.length + 1}`
		};
		const circs = circles.concat([circ]);
		setCircles(circs);
		const shs = shapes.concat([`circ${circles.length + 1}`]);
		setShapes(shs);
	};
	const drawLine = () => {
		selectShape(null);
		addLine(stageEl.getStage(), layerEl.current);
	};
	const eraseLine = () => {
		addLine(stageEl.getStage(), layerEl.current, 'erase');
	};
	const drawText = () => {
		const id = addTextNode(stageEl.current.getStage(), layerEl.current);
		const shs = shapes.concat([id]);
		setShapes(shs);
	};
	const drawImage = () => {
		fileUploadEl.current.click();
	};
	const fileChange = ev => {
		const file = ev.target.files[0];
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				const id = uuidv1();
				images.push({
					content: reader.result,
					id
				});
				setImages(images);
				fileUploadEl.current.value = null;
				shapes.push(id);
				setShapes(shapes);
				forceUpdate();
			},
			false
		);
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const zoomIn = () => {
		const scaleBy = 1.01;
		const oldScale = stageEl.scaleX();
		const stage = stageEl.getStage();
		const newScale = oldScale * scaleBy;

		const mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
		};

		setStageScale(newScale);
		setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
		setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
		forceUpdate();
	};

	const zoomOut = () => {
		const scaleBy = 1.01;
		const oldScale = stageEl.scaleX();
		const stage = stageEl.getStage();
		const newScale = oldScale / scaleBy;

		const mousePointTo = {
			x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
			y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
		};

		setStageScale(newScale);
		setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
		setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
		forceUpdate();
	};

	const undo = () => {
		const lastId = shapes[shapes.length - 1];
		let index = circles.findIndex(c => c.id == lastId);
		if (index != -1) {
			circles.splice(index, 1);
			setCircles(circles);
		}
		index = rectangles.findIndex(r => r.id == lastId);
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
	const convertosvg = () => {
		// replaceUrl(dataURL);

		setStageScale(1);
		setStageX(1);
		setStageY(1);

		forceUpdate();

		setTimeout(() => {
			const dataURL = stageEl.getStage().toDataURL({ pixelRatio: 3 });
			downloadURI(dataURL, 'stage.png');
			onClose();
		}, 100);
	};
	const downloadURI = (uri, name) => {
		const link = document.createElement('a');
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	document.addEventListener('keydown', ev => {
		if (ev.code == 'Delete') {
			let index = circles.findIndex(c => c.id == selectedId);
			if (index != -1) {
				circles.splice(index, 1);
				setCircles(circles);
			}
			index = rectangles.findIndex(r => r.id == selectedId);
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

	return (
		<>
			<Dialog open={open} onClose={onClose} fullWidth className="rs-dialog-sm-full zoom-125 custom-drawing-modal">
				<DialogTitle component="div" className="p-0">
					<AppBar position="static" elevation={1}>
						<Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
							<div className="flex flex-1">
								<div className="my-12">
									<div className="font-size-18">Drawing</div>
								</div>
							</div>
							<IconButton color="inherit">
								<Icon>close</Icon>
							</IconButton>
						</Toolbar>
					</AppBar>
				</DialogTitle>
				<DialogContent id="dialog-content" className="p-0 sm:p-10">
					<ButtonGroup className="mb-12">
						<Button variant="primary" onClick={drawLine}>
							Line
						</Button>
						<Button variant="primary" onClick={eraseLine}>
							Erase
						</Button>
						<Button variant="primary" onClick={undo}>
							Undo
						</Button>
						<Button style={{ marginRight: '3px' }} variant="primary" onClick={zoomIn}>
							ZoomIn +
						</Button>
						<Button style={{ marginRight: '3px' }} variant="primary" onClick={zoomOut}>
							Zoom Out -
						</Button>
					</ButtonGroup>
					<input style={{ display: 'none' }} type="file" ref={fileUploadEl} onChange={fileChange} />
					{/* <Stage
			  width={imageProps.width}
			  height={imageProps.height}
			  ref={stageEl}
			  onMouseDown={(e) => {
				// deselect when clicked on empty area
				const clickedOnEmpty = e.target === e.target.getStage();
				if (clickedOnEmpty) {
				  selectShape(null);
				}
			  }}
			> */}

					<Stage
						style={{ overFlow: 'scroll', background: '#DFD9D9' }}
						width={imageProps.width}
						height={imageProps.height}
						onWheel={handleWheel}
						scaleX={stageScale}
						scaleY={stageScale}
						x={stageX}
						y={stageY}
						ref={ref => {
							stageEl = ref;
						}}
						onMouseDown={e => {
							// deselect when clicked on empty area
							const clickedOnEmpty = e.target === e.target.getStage();
							if (clickedOnEmpty) {
								selectShape(null);
							}
						}}
					>
						<Layer ref={layerEl}>
							{images.map((image, i) => {
								return (
									<Image
										key={i}
										imageUrl={image.content}
										isSelected={image.id === selectedId}
										onSelect={() => {
											selectShape(image.id);
										}}
										saveImageWidthHeight={imgprops => saveImageWidthHeight(imgprops)}
										onChange={newAttrs => {
											const imgs = images.slice();
											imgs[i] = newAttrs;
										}}
										getMyRef={ref => (imageRef = ref)}
										imageProps={imageProps}
									/>
								);
							})}
						</Layer>
					</Stage>
				</DialogContent>
				<DialogActions className="p-16 px-20">
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							// setImageProps({
							// 	width,
							// 	height
							// });
							setTimeout(() => {
								convertosvg();
							}, 400);

							// console.log('imageRef', imageRef.getClientRect())
						}}
					>
						save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
export default DrawImage;
