import FuseAnimate from '@fuse/core/FuseAnimate';
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
import { Icon, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import * as ICONS from 'app/main/apps/constants';

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
export default function FileGridItem({ tileData, pageLayout }) {
	const dispatch = useDispatch();
	const allFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
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
									<img className="icon mr-8" src={ICONS.ZIP_ICON_PATH} />
								</div>
							) : (
								<div className="soft-icon">
									<img className="mr-8" src={ICONS.GENERIC_ICON_PATH} />
								</div>
							)}
							<GridListTileBar
								className="text-14"
								title={
									<>
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
											) : (
												<div className="soft-icon-title">
													<img className="mr-8" src={ICONS.GENERIC_ICON_PATH} />
												</div>
											)}
											{/* <PictureAsPdfOutlinedIcon className="text-18 text-red mr-8" /> */}
											<p> {tile.title}</p>
										</div>
									</>
								}
								// subtitle={<span>size: {tile.size}</span>}
								actionIcon={
									<IconButton
										// onClick={}
										aria-label={`info about ${tile.title}`}
										className={clsx(classes.icon, 'file-grid-action-dropdown')}
									>
										<MoreVertIcon />
									</IconButton>
								}
							/>
						</GridListTile>
					))
				) : (
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							There are no files!
						</Typography>
					</div>
				)}
			</GridList>
		</div>
	);
}
