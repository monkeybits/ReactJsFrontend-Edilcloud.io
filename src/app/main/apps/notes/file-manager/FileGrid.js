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
import { Grid, Typography } from '@material-ui/core';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import FileGridItem from './FileGridItem';

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
const useStylesList = makeStyles(theme => ({
	root: {
		borderRadius: '5%',
		backgroundColor: '#8080801c'
	}
}));
function FileGrid(props) {
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.folders);
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.files);
	const allFiles = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const folderPath = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.folderPath);
	const currentFolderPath = folderPath[folderPath.length - 1];
	const selectedItemId = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.selectedItemId);
	const searchText = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.searchText);
	const [currentFolders, setCurrentFolders] = useState([]);
	const [currentFiles, setCurrentFiles] = useState([]);
	const classes = useStyles();
	const classesListItems = useStylesList();
	const checkData = data => (data ? data : '-');
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
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
			setCurrentFolders(modifyfolders);
			let tempFiles = files.filter(f => f.folder_relative_path == currentFolderPath);
			setCurrentFiles(tempFiles);
			dispatch(Actions.setAllFiles([...modifyfolders, ...tempFiles]));
		}
	};
	useEffect(() => {
		setAllFilesInit();
	}, [files, folders, files.photos, files.videos, files.documents]);
	useEffect(() => {
		dispatch(Actions.setSelectedItem(''));
		setAllFilesInit();
	}, [currentFolderPath]);
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
			dispatch(Actions.setAllFiles(results));
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
			dispatch(
				Actions.setAllFiles([
					...modifyfolders,
					...files.filter(f => f.folder_relative_path == currentFolderPath)
				])
			);
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
		<div>
			{!!currentFolders.length && (
				<>
					{' '}
					<Typography variant="h6">Folders</Typography>
					<Grid container spacing={12}>
						{currentFolders.map(d => (
							<Grid
								className="px-12 mb-32"
								item
								xs={12}
								sm={6}
								md={4}
								xl={3}
								onClick={() => dispatch(Actions.setFolderPath(d.path))}
							>
								<ListItem className={classesListItems.root}>
									<ListItemIcon>
										<FolderIcon />
									</ListItemIcon>
									<ListItemText primary={d.title} secondary={null} />
								</ListItem>
							</Grid>
						))}
					</Grid>
				</>
			)}
			{!!currentFiles.length && (
				<>
					<Typography variant="h6">Files</Typography>
					<Grid container spacing={12}>
						<FileGridItem tileData={currentFiles} />
					</Grid>
				</>
			)}
		</div>
	);
}

export default FileGrid;
