import FuseAnimate from '@fuse/core/FuseAnimate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ReadPDF from './ReadPDF';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFilePdf,
	faFile,
	faFileExcel,
	faFileVideo,
	faFileAudio,
	faFileImage,
	faFileWord
} from '@fortawesome/free-regular-svg-icons';
const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	},
	typeIcon: {
		'&.folder:before': {
			content: "'folder'",
			color: '#FFB300'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	}
});

function DetailSidebarContent(props) {
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerAppProject }) => files[fileManagerAppProject.selectedItemId]);

	const classes = useStyles();

	if (!selectedItem) {
		return null;
	}
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
	const checkData = data => (data ? data : '-');
	const getCssColor = fileType =>
	fileType == 'pdf'
		? { color: 'red' }
		: fileType == 'video'
		? { color: 'red' }
		: fileType == 'mp3'
		? { color: 'brown' }
		: fileType == 'docx'
		? { color: 'blue' }
		: fileType == 'xlsx'
		? { color: 'green' }
		: {};
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={600}>
			<div className="file-details p-16 sm:p-24">
			<div className="preview file-icon flex items-center justify-center mb-12">
					{selectedItem.type == 'photo' ? (
						<img src={selectedItem.photo} />
					) : selectedItem.extension == 'pdf' ? (
						<ReadPDF height={256} width={270} file={selectedItem.document} />
					) : selectedItem.type == 'video' ? (
						<FontAwesomeIcon
							icon={faFileVideo}
							style={{ ...getCssColor(selectedItem.type), fontSize: '2.4rem' }}
						/>
					) : (
						<FontAwesomeIcon
							icon={
								selectedItem.type == 'document'
									? selectedItem.extension == 'pdf'
										? faFilePdf
										: selectedItem.extension == 'docx'
										? faFileWord
										: selectedItem.extension == 'xlsx'
										? faFileExcel
										: selectedItem.extension == 'mp3'
										? faFileAudio
										: faFile
									: faFile
							}
							style={{ ...getCssColor(selectedItem.extension), fontSize: '2.4rem' }}
						/>
					)}
				</div>

				<FormControlLabel
					className="offline-switch"
					control={<Switch checked={selectedItem.offline} aria-label="Available Offline" />}
					label="Available Offline"
				/>

				<Typography variant="subtitle1" className="py-16">
					Info
				</Typography>

				<table className={clsx(classes.table, 'w-full text-justify')}>
					<tbody>
						<tr className="type">
							<th>Type</th>
							<td>{checkData(selectedItem.type)}</td>
						</tr>

						<tr className="size">
							<th>Size</th>
							<td>{selectedItem.size === '' ? '-' : selectedItem.size}</td>
						</tr>

						<tr className="location">
							<th>Location</th>
							<td>{checkData(selectedItem.location)}</td>
						</tr>

						<tr className="owner">
							<th>Owner</th>
							<td>{checkData(selectedItem.owner)}</td>
						</tr>

						<tr className="modified">
							<th>Modified</th>
							<td>{getdate(selectedItem.date_last_modify)}</td>
						</tr>

						<tr className="opened">
							<th>Opened</th>
							<td>{checkData(selectedItem.opened)}</td>
						</tr>

						<tr className="created">
							<th>Created</th>
							<td>{getdate(selectedItem.date_create)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</FuseAnimate>
	);
}

export default DetailSidebarContent;
