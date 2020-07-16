import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import moment from 'moment';

const useStyles = makeStyles({
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

function FileList(props) {
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerApp }) => fileManagerApp.files?.folders);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.files);
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const [allFiles, setAllFiles] = useState([]);
	useEffect(() => {
		let modifyfolders = folders?.filter(d => d.path.split('/').length <= 1);
		if (modifyfolders) {
			modifyfolders = modifyfolders.map(item => ({ ...item, title: item.path, type: 'folder' }));
			setAllFiles([...modifyfolders, ...files]);
		}
	}, [files, folders]);
	const classes = useStyles();
	const checkData = data => (data ? data : '-');
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
						<TableCell>Name</TableCell>
						<TableCell className="hidden sm:table-cell">Type</TableCell>
						<TableCell className="hidden sm:table-cell">Owner</TableCell>
						<TableCell className="text-center hidden sm:table-cell">Size</TableCell>
						<TableCell className="hidden sm:table-cell">Modified</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{Object.entries(allFiles).map(([key, n]) => {
						return (
							<TableRow
								key={n.id}
								hover
								onClick={event => n.id != undefined && dispatch(Actions.setSelectedItem(n.id))}
								selected={n.id === selectedItemId}
								className="cursor-pointer"
							>
								<TableCell className="max-w-64 w-64 p-0 text-center">
									<Icon className={clsx(classes.typeIcon, n.type)}>
										{n.type == 'video' ? 'movie' : n.type}{' '}
									</Icon>
								</TableCell>
								<TableCell>{n.title}</TableCell>
								<TableCell className="hidden sm:table-cell">{n.type}</TableCell>
								<TableCell className="hidden sm:table-cell">{checkData(n.owner)}</TableCell>
								<TableCell className="text-center hidden sm:table-cell">
									{n.size === '' ? '-' : n.size}
								</TableCell>
								<TableCell className="hidden sm:table-cell">
									{n.date_last_modify ? getdate(n.date_last_modify) : '-'}
								</TableCell>
								<Hidden lgUp>
									<TableCell>
										<IconButton
											onClick={ev => props.pageLayout.current.toggleRightSidebar()}
											aria-label="open right sidebar"
										>
											<Icon>info</Icon>
										</IconButton>
									</TableCell>
								</Hidden>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</FuseAnimate>
	);
}

export default FileList;
