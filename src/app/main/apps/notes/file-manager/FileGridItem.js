import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
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
import clsx from 'clsx';
import * as Actions from './store/actions';
import { Icon, ListItemIcon, MenuItem, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import * as ICONS from 'app/main/apps/constants';
import TippyMenu from 'app/TippyMenu';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	DOWNLOAD_PHOTO,
	DOWNLOAD_VIDEO,
	DOWNLOAD_DOCUMENT,
	PHOTO_DELETE,
	VIDEO_DELETE,
	DOCUMENT_DELETE,
	FOLDER_DELETE
} from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import FileSaver from 'file-saver';
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)'
	}
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function FileGridItem({ tileData, pageLayout, handleDelete, setProgress }) {
	const dispatch = useDispatch();
	const allFiles = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const classes = useStyles();
	const handleOpenData = (ev, tile) => {
		ev.preventDefault();
		ev.stopPropagation();
		pageLayout.current.toggleRightSidebar();
		const findIndex = [...allFiles].findIndex(
			element => element.mainId == tile.mainId && element.type == tile.type
		);
		let fileData = allFiles[findIndex];
		dispatch(Actions.setSelectedItem(fileData.id));
	};
	const options = [
		{
			name: 'Delete',
			icon: <Icon>delete</Icon>,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				handleDelete(n);
			}
		},

		{
			name: 'Download',
			icon: <img className="icon mr-8" src={ICONS.DOWNLOAD_ICON_PATH} />,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				onDownload(n);
			}
		},
		{
			name: 'Move to',
			icon: <Icon>transform</Icon>,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				dispatch(Actions.openMoveFileDialog(n));
			}
		},
		{
			name: 'View',
			icon: <Icon>info</Icon>,
			handleClickEvent: (ev, n) => {
				handleOpenData(ev, n);
			}
		}
	];
	const onDownload = tile => {
		let findIndex = 0;
		if (tile.type == 'folder') {
			findIndex = [...allFiles].findIndex(element => element.path == tile.path);
		} else {
			findIndex = [...allFiles].findIndex(element => element.mainId == tile.mainId && element.type == tile.type);
		}
		let selectedItem = allFiles[findIndex];
		if (selectedItem) {
			setProgress(0);
			dispatch(Actions.onUploadHandleLoading(true));
			let apiurl =
				selectedItem.type == 'photo'
					? DOWNLOAD_PHOTO(selectedItem.mainId)
					: selectedItem.type == 'video'
					? DOWNLOAD_VIDEO(selectedItem.mainId)
					: DOWNLOAD_DOCUMENT(selectedItem.mainId);
			apiCall(
				apiurl,
				{},
				({ headers, data }) => {
					let image = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
					var file = `data:${headers['content-type'].toLowerCase()};base64,${image}`;
					console.log({ file });
					FileSaver.saveAs(file);
					// var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
					// FileSaver.saveAs(file);
					dispatch(Actions.onUploadHandleLoading(false));
				},
				err => {
					dispatch(Actions.onUploadHandleLoading(false));
					setProgress(0);
				},
				METHOD.GET,
				{
					...getHeaderToken(),
					responseType: 'arraybuffer',
					onDownloadProgress: progressEvent => {
						var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percentCompleted);
					}
				},
				true
			);
		}
	};
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
		<div className={classes.root}>
			<GridList cellHeight={180} className={classes.gridList}>
				{!!tileData?.length ? (
					tileData.map(tile => (
						<GridListTile key={tile.img} onClick={e => handleOpenData(e, tile)}>
							{tile.type == 'video' ? (
								<div className="soft-icon">
									<img className="icon mr-8" src={ICONS.VIDEO_ICON_PATH} />
								</div>
							) : tile.type == 'photo' ? (
								<img src={tile.photo} alt={tile.title} />
							) : tile.extension == 'pdf' ? (
								<div className="soft-icon">
									<img className="mr-8" src={ICONS.PDF_ICON_PATH} />
								</div>
							) : tile.extension == 'mp3' ? (
								<div className="soft-icon">
									<img className="mr-8" src={ICONS.AUDIO_ICON_PATH} />
								</div>
							) : tile.extension == 'docx' ? (
								<div className="soft-icon">
									<img className="mr-8" src={ICONS.DOC_ICON_PATH} />
								</div>
							) : tile.extension == 'xlsx' ? (
								<div className="soft-icon">
									<img className="mr-8" src={ICONS.EXCEL_ICON_PATH} />
								</div>
							) : tile.extension == 'zip' || tile.extension == 'rar' ? (
								<div className="soft-icon">
									{' '}
									<img className="icon mr-8" src={ICONS.ZIP_ICON_PATH} />
								</div>
							) : tile.extension == 'ppt' || tile.extension == 'pptx' || tile.extension == 'pptm' ? (
								<img className="icon mr-8" src={ICONS.SLIDES_ICON_PATH} />
							) : (
								<div className="soft-icon">
									<img className="mr-8" src={ICONS.GENERIC_ICON_PATH} />
								</div>
							)}
							<GridListTileBar
								className="text-14"
								title={
									<div className="flex">
										{tile.extension == 'pdf' ? (
											<div className="soft-icon-title">
												<img className="mr-8" src={ICONS.PDF_ICON_PATH} />
											</div>
										) : tile.type == 'video' ? (
											<div className="soft-icon-title">
												<img className="mr-8" src={ICONS.VIDEO_ICON_PATH} />
											</div>
										) : tile.type == 'photo' ? (
											<div className="soft-icon-title">
												<img className="mr-8" src={ICONS.IMAGE_ICON_PATH} />
											</div>
										) : tile.extension == 'mp3' ? (
											<div className="soft-icon-title">
												<img className="mr-8" src={ICONS.AUDIO_ICON_PATH} />
											</div>
										) : tile.extension == 'docx' ? (
											<div className="soft-icon-title">
												<img className="mr-8" src={ICONS.DOC_ICON_PATH} />
											</div>
										) : tile.extension == 'xlsx' ? (
											<div className="soft-icon-title">
												<img className="mr-8" src={ICONS.EXCEL_ICON_PATH} />
											</div>
										) : tile.extension == 'zip' || tile.extension == 'rar' ? (
											<div className="soft-icon-title">
												<img className="icon mr-8" src={ICONS.ZIP_ICON_PATH} />
											</div>
										) : tile.extension == 'ppt' ||
										  tile.extension == 'pptx' ||
										  tile.extension == 'pptm' ? (
											<img className="icon mr-8" src={ICONS.SLIDES_ICON_PATH} />
										) : (
											<div className="soft-icon-title">
												<img className="mr-8" src={ICONS.GENERIC_ICON_PATH} />
											</div>
										)}
										{/* <PictureAsPdfOutlinedIcon className="text-18 text-red mr-8" /> */}
										<p> {tile.title}</p>
									</div>
								}
								// subtitle={<span>size: {tile.size}</span>}
								actionIcon={
									<TippyMenu
										icon={
											<IconButton
												aria-label="more"
												aria-controls="long-menu"
												aria-haspopup="true"
												// onClick={handleClick}
											>
												<MoreVertIcon />
											</IconButton>
										}
										outsideClick
									>
										{options.map(({ name, icon, handleClickEvent }) => (
											<MenuItem
												key={name}
												onClick={e => {
													// menuRef.current.handleMenuClose();
													handleClickEvent(e, tile);
												}}
											>
												<ListItemIcon>{icon}</ListItemIcon>
												<Typography variant="inherit"> {name}</Typography>
											</MenuItem>
										))}
									</TippyMenu>
								}
							/>
						</GridListTile>
					))
				) : (
					<div>
						<div className="flex flex-1 items-center justify-center h-full">
							<img className="w-400" src="assets/images/errors/nofiles.png"></img>
						</div>
						<div className="flex flex-1 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h5">
								Seems that there are no files yet!
							</Typography>
						</div>
						<div className="flex flex-1 mt-20 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h6">
								Create a file or a folder clicking on green + button
							</Typography>
						</div>
					</div>
				)}
			</GridList>
		</div>
	);
}
