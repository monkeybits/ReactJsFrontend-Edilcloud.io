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
import FuseUtils from '@fuse/utils';
import { Typography } from '@material-ui/core';

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
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = folderPath[folderPath.length - 1];
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const [allFiles, setAllFiles] = useState([]);
	const classes = useStyles();
	const checkData = data => (data ? data : '-');
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
	const setAllFilesInit = () => {
		let modifyfolders = folders?.filter(
			f =>
				f.path.includes(currentFolderPath) &&
				f.path.split('/').length <= folderPath.length &&
				!folderPath.includes(f.path)
		);
		if (modifyfolders) {
			modifyfolders = modifyfolders.map(item => {
				let title = item.path.split('/');
				title = title[title.length - 1];
				return { ...item, title, type: 'folder' };
			});
			setAllFiles([...modifyfolders, ...files.filter(f => f.folder_relative_path == currentFolderPath)]);
		}
	};
	useEffect(() => {
		setAllFilesInit();
	}, [files, folders]);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (searchText && searchText.length) {
			let results = getFilteredArray(allFiles, searchText);
			setAllFiles(results);
		} else {
			setAllFilesInit();
		}
	}, [searchText]);
	useEffect(() => {
		let modifyfolders = folders?.filter(
			f =>
				f.path.includes(currentFolderPath) &&
				f.path.split('/').length <= folderPath.length &&
				!folderPath.includes(f.path)
		);
		if (modifyfolders) {
			modifyfolders = modifyfolders.map(item => {
				let title = item.path.split('/');
				title = title[title.length - 1];
				return { ...item, title, type: 'folder' };
			});
			setAllFiles([...modifyfolders, ...files.filter(f => f.folder_relative_path == currentFolderPath)]);
		}
	}, [currentFolderPath]);
	if (allFiles.length === 0 && searchText) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no files!
				</Typography>
			</div>
		);
	}
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
					{currentFolderPath != '' && (
						<TableRow>
							<TableCell onClick={() => dispatch(Actions.popFolderPath())}>
								<IconButton aria-label="back" size="small">
									<Icon>more_horiz</Icon>
								</IconButton>
							</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					)}
					{Object.entries(allFiles).map(([key, n]) => {
						return (
							<TableRow
								key={n.id}
								hover
								onClick={event =>
									n.type == 'folder'
										? dispatch(Actions.setFolderPath(n.path))
										: dispatch(Actions.setSelectedItem(n.id))
								}
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
