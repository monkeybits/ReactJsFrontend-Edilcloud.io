import React from 'react';
import { Icon, IconButton } from '@material-ui/core';

function NoteFormUploadImage(props) {
	return (
		<>
			<label htmlFor="button-file">
				<input accept="image/*" className="hidden" id="button-file" type="file" onChange={props.onChange} />
				<IconButton className="w-32 h-32 mx-4 p-0" component="span">
					<Icon fontSize="small">image</Icon>
				</IconButton>
			</label>
		</>
	);
}

export default NoteFormUploadImage;
