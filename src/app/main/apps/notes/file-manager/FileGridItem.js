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
import { Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';

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
				{tileData.map(tile => (
					<GridListTile key={tile.img} onClick={e => handleOpenData(e, tile)}>
						{tile.type == 'video' ? (
							<FontAwesomeIcon
								className="p-48"
								icon={faFileVideo}
								style={{ ...getCssColor(tile.type), fontSize: '1.8rem' }}
							/>
						) : tile.type == 'photo' ? (
							<img src={tile.photo} alt={tile.title} />
						) : (
							<FontAwesomeIcon
								className="p-48"
								icon={
									tile.type == 'document'
										? tile.extension == 'pdf'
											? faFilePdf
											: tile.extension == 'docx'
											? faFileWord
											: tile.extension == 'xlsx'
											? faFileExcel
											: tile.extension == 'mp3'
											? faFileAudio
											: faFile
										: faFile
								}
								style={{ ...getCssColor(tile.extension), fontSize: '1.8rem' }}
							/>
						)}
						<GridListTileBar
							className="text-14"
							title={
								<div className="flex">
									{tile.extension == 'pdf' ? (
										<img className="icon mr-8" src="/assets/fileIcons/pdf-icon.png" />
									) : tile.extension == 'video' ? (
										<img className="icon mr-8" src="/assets/fileIcons/video-icon.png" />
									) : tile.extension == 'mp3' ? (
										<img className="icon mr-8" src="/assets/fileIcons/video-icon.png" />
									) : tile.extension == 'docx' ? (
										<img className="icon mr-8" src="/assets/fileIcons/doc-icon.png" />
									) : tile.extension == 'xlsx' ? (
										<img className="icon mr-8" src="/assets/fileIcons/excel-icon.png" />
									) : (
										<FontAwesomeIcon icon={faFile} className="icon mr-8" />
									)}
									{/* <PictureAsPdfOutlinedIcon className="text-18 text-red mr-8" /> */}
									<p> {tile.title}</p>
								</div>
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
				))}
			</GridList>
		</div>
	);
}
