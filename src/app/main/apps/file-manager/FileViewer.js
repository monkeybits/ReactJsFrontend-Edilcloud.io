/* =============================================================================
 TODO: FileViewer.js
 ===============================================================================
*This File is part of Company File manager
TODO: This File is created to view view the media file 
*/
import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

export default class FileViewerComponent extends Component {
	onError(e) {
		// console.log(e, 'error in file-viewer');
	}

	render() {
		const { type, file } = this.props;
		return (
			<FileViewer fileType={type} filePath={file} errorComponent={CustomErrorComponent} onError={this.onError} />
		);
	}
}
