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
	const allFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = folderPath[folderPath.length - 1];
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	// const [allFiles, setAllFiles] = useState([]);
	const classes = useStyles();
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
			dispatch(
				Actions.setAllFiles([
					...modifyfolders,
					...files.filter(f => f.folder_relative_path == currentFolderPath)
				])
			);
		}
	};
	useEffect(() => {
		setAllFilesInit();
	}, [files, folders, files.photos, files.videos, files.documents]);

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
						<TableCell></TableCell>
						<TableCell></TableCell>
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
							<TableCell className="hidden sm:table-cell"></TableCell>
							<TableCell className="hidden sm:table-cell"></TableCell>
							<TableCell className="hidden sm:table-cell"></TableCell>
							<TableCell className="hidden sm:table-cell"></TableCell>
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
									{/* <Icon className={clsx(classes.typeIcon, n.type)}>
										{n.type == 'video' ? 'movie' : n.type}{' '}
									</Icon> */}
									{n.type == 'video' ? (
										<FontAwesomeIcon
											icon={faFileVideo}
											style={{ ...getCssColor(n.type), fontSize: '2.4rem' }}
										/>
									) : n.type == 'photo' ? (
										<FontAwesomeIcon
											icon={faFileImage}
											style={{ color: 'black', fontSize: '2.4rem' }}
										/>
									) : n.type == 'folder' ? (
										<Icon className={clsx(classes.typeIcon, n.type)}>folder</Icon>
									) : (
										<FontAwesomeIcon
											icon={
												n.type == 'document'
													? n.extension == 'pdf'
														? faFilePdf
														: n.extension == 'docx'
														? faFileWord
														: n.extension == 'xlsx'
														? faFileExcel
														: n.extension == 'mp3'
														? faFileAudio
														: faFile
													: faFile
											}
											style={{ ...getCssColor(n.extension), fontSize: '2.4rem' }}
										/>
									)}
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

								<TableCell>
									<IconButton
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
										}}
										aria-label="open right sidebar"
									>
										<Icon>transform</Icon>
									</IconButton>
								</TableCell>

								{/* <Hidden lgUp> */}
								<TableCell>
									<IconButton
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											props.pageLayout.current.toggleRightSidebar();
											dispatch(Actions.setSelectedItem(n.id));
										}}
										aria-label="open right sidebar"
									>
										<Icon>info</Icon>
									</IconButton>
								</TableCell>
								{/* </Hidden> */}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</FuseAnimate>
	);
}

export default FileList;
