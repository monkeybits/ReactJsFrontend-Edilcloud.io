import { Icon, IconButton } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

const MicRecorder = require('mic-recorder-to-mp3');

const recorder = new MicRecorder({
	bitRate: 320
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
				const file = new File(buffer, `Record ${moment().format('ll')}.mp3`, {
					type: blob.type,
					lastModified: Date.now()
				});
				this.props.afterRecordComplete(file);
			})
			.catch(e => {
				alert('We could not retrieve your message');
				// console.log(e);
			});
	};

	sendDirectToChat = () => {
		if (this.state.record) {
			this.setState({ record: false });
			recorder
				.stop()
				.getMp3()
				.then(([buffer, blob]) => {
					// do what ever you want with buffer and blob
					// Example: Create a mp3 file and play
					const file = new File(buffer, `Record ${moment().format('ll')}.mp3`, {
						type: blob.type,
						lastModified: Date.now()
					});
					this.props.sendDirectToChat(file);
				})
				.catch(e => {
					alert('We could not retrieve your message');
					// console.log(e);
				});
		}
	};

	render() {
		return (
			<div>
				{this.state.record ? (
					<>
						<div className="sound-icon">
							<div className="sound-wave">
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
								<i className="bar" />
							</div>
						</div>
						<div className="blink" />

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
