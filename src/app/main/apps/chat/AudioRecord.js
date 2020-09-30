import { Icon, IconButton } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { ReactMic } from 'react-mic';
import moment from 'moment';
export default class AudioRecord extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			record: false
		};
	}

	startRecording = () => {
		this.setState({ record: true });
	};

	stopRecording = () => {
		this.setState({ record: false });
	};

	onData(recordedBlob) {
		// console.log('chunk of real-time data is: ', recordedBlob);
	}

	onStop = recordedBlob => {
		console.log('recordedBlob is: ', recordedBlob, recordedBlob.blob instanceof Blob);
		this.props.afterRecordComplete(
			new File([{ ...recordedBlob.blob }], 'Record ' + moment().format('ll') + '.wav', {
				type: recordedBlob.options.mimeType
			})
		);
	};

	render() {
		return (
			<div>
				<ReactMic
					record={this.state.record}
					className="sound-wave"
					onStop={this.onStop}
					onData={this.onData}
					strokeColor="#000000"
					mimeType="audio/wav"
					backgroundColor="#FF4081"
				/>
				{this.state.record ? (
					<IconButton key="close" aria-label="Close" color="inherit" onClick={this.stopRecording}>
						<Icon>mic</Icon>
					</IconButton>
				) : (
					<IconButton key="close" aria-label="Close" color="inherit" onClick={this.startRecording}>
						<Icon> mic_off</Icon>
					</IconButton>
				)}
			</div>
		);
	}
}
