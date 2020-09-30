import { Icon, IconButton } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
const MicRecorder = require('mic-recorder-to-mp3');
const recorder = new MicRecorder({
	bitRate: 128
});
export default class AudioRecord extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			record: false
		};
	}

	startRecording = () => {
		recorder
			.start()
			.then(() => {
				this.setState({ record: true });
				// something else
			})
			.catch(e => {
				console.error(e);
			});
	};

	stopRecording = () => {
		this.setState({ record: false });
		recorder
			.stop()
			.getMp3()
			.then(([buffer, blob]) => {
				// do what ever you want with buffer and blob
				// Example: Create a mp3 file and play
				const file = new File(buffer, 'Record ' + moment().format('ll') + '.mp3', {
					type: blob.type,
					lastModified: Date.now()
				});
				this.props.afterRecordComplete(file);
			})
			.catch(e => {
				alert('We could not retrieve your message');
				console.log(e);
			});
	};

	render() {
		return (
			<div>
				{this.state.record ? (
					<>
						<div class="sound-icon disabled">
							<div class="sound-wave">
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
								<i class="bar"></i>
							</div>
						</div>

						<IconButton key="close" aria-label="Close" color="inherit" onClick={this.stopRecording}>
							<Icon>mic</Icon>
						</IconButton>
					</>
				) : (
					<IconButton key="close" aria-label="Close" color="inherit" onClick={this.startRecording}>
						<Icon> mic_off</Icon>
					</IconButton>
				)}
			</div>
		);
	}
}
