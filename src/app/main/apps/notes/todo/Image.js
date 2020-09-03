import React, { useState } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
const Img = ({ shapeProps, isSelected, onSelect, onChange, imageUrl, getMyRef, imageProps, setImageProps }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	const [image] = useImage(imageUrl);
	// const [imageProps, setImageProps] = useState({
	// 	height: 311,
	// 	width: 480
	// });
	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	React.useEffect(() => {
		const node = shapeRef.current;
		const scaleX = node.scaleX();
		const scaleY = node.scaleY();
		onChange({
			...shapeProps,
			x: node.x(),
			y: node.y(),
			width: imageProps.width ? imageProps.width : node.width() * scaleX,
			height: imageProps.height ? imageProps.height : node.height() * scaleY
		});
	}, [imageProps.width, imageProps.height]);
	React.useEffect(() => {
		if (shapeRef.current) {
			const node = shapeRef.current;
			getMyRef(node);
		}
	}, [shapeRef.current]);
	return (
		<React.Fragment>
			<Image
				width={imageProps.width}
				height={imageProps.height}
				draggable={isSelected}
				onDblClick={onSelect}
				image={image}
				ref={shapeRef}
				keepRatio={false}
				onDragEnd={e => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y()
					});
				}}
				onTransformEnd={e => {
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();
					console.log('getClientRect', node.getClientRect());
					// setImageProps({
					// 	height: node.height() * scaleY,
					// 	width: node.width() * scaleX
					// });
					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						width: node.width() * scaleX,
						height: node.height() * scaleY
					});
				}}
			/>
			{isSelected && <Transformer ref={trRef} />}
		</React.Fragment>
	);
};
export default Img;
