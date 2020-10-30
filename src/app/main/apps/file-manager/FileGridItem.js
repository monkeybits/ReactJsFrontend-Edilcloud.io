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
					<GridListTile key={tile.img}>
						{tile.type == 'video' ? (
							<FontAwesomeIcon
								icon={faFileVideo}
								style={{ ...getCssColor(tile.type), fontSize: '2.4rem' }}
							/>
						) : tile.type == 'photo' ? (
							<img src={tile.photo} alt={tile.title} />
						) : (
							<FontAwesomeIcon
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
								style={{ ...getCssColor(tile.extension), fontSize: '2.4rem' }}
							/>
						)}
						<GridListTileBar
							title={tile.title}
							subtitle={<span>size: {tile.size}</span>}
							actionIcon={
								<IconButton
									onClick={ev => {
										ev.preventDefault();
										ev.stopPropagation();
										pageLayout.current.toggleRightSidebar();
										const findIndex = [...allFiles].findIndex(
											element => element.mainId == tile.mainId && element.type == tile.type
										);
										let fileData = allFiles[findIndex];
										dispatch(Actions.setSelectedItem(fileData.id));
									}}
									aria-label={`info about ${tile.title}`}
									className={classes.icon}
								>
									<InfoIcon />
								</IconButton>
							}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
}
