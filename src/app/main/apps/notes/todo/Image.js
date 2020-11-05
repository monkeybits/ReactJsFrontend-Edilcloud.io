import React, { useState } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
const Img = ({ shapeProps, isSelected, onSelect, onChange, imageUrl, getMyRef, saveImageWidthHeight, imageProps }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	const [image] = useImage(imageUrl);

	React.useEffect(() => {
		saveImageWidthHeight({
			width: image ? image.width : 0,
			height: image ? image.height : 0
		});
	}, [image]);

	React.useEffect(() => {
		if (shapeRef.current) {
			const node = shapeRef.current;
			getMyRef(node);
		}
	}, [shapeRef.current]);
	return (
		<React.Fragment>
			<Image
				width={image && image.width}
				height={image && image.height}
				draggable={isSelected}
				onDblClick={onSelect}
				image={image}
				ref={shapeRef}
				keepRatio={true}
			/>
			{isSelected && <Transformer ref={trRef} />}
		</React.Fragment>
	);
};
export default Img;
