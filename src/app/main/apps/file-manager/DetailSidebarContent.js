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
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.files);
	const selectedItem = useSelector(({ fileManagerApp }) => files[fileManagerApp.selectedItemId]);

	const classes = useStyles();

	if (!selectedItem) {
		return null;
	}
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
	const checkData = data => (data ? data : '-');
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={200}>
			<div className="file-details p-16 sm:p-24">
				<div className="preview h-128 sm:h-256 file-icon flex items-center justify-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className={clsx(classes.typeIcon, selectedItem.type, 'text-48')}>
							{selectedItem.type == 'video' ? 'movie' : selectedItem.type}
						</Icon>
					</FuseAnimate>
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
