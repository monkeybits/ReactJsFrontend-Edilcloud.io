import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
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

function CardAttachment(props) {
	const [anchorEl, setAnchorEl] = useState(null);

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}
	const itemImage = () => (
		<div className="flex w-full sm:w-1/2 mb-16 px-16" key={props.item.id}>
			<div className="flex items-center justify-center min-w-128 w-128 h-128">
				<Paper className="rounded-4 overflow-hidden" elevation={1}>
					<img className="block h-128 w-128 object-cover" src={props.item.media_url} alt="attachment" />
				</Paper>
			</div>
		</div>
	);
	const wrapper = child => (
		<div className="flex w-full sm:w-1/2 mb-16 px-16" key={props.item.id}>
			<div className="flex items-center justify-center min-w-128 w-128 h-128">
				<Paper className="rounded-4 overflow-hidden" elevation={1}>
					{child}
				</Paper>
			</div>
		</div>
	);
	let type = () => (props.item.type ? props.item.type.split('/')[0] : '');
	switch (type()) {
		case 'image': {
			return itemImage();
		}
		case 'audio': {
			return (<audio controls src={props.item.media_url} />);
		}
		case 'video': {
			return wrapper(<FontAwesomeIcon icon={faFileVideo} style={{ color: 'red', fontSize: '2.4rem' }} />);
		}
		case 'application': {
			return props.item.extension == '.xlsx' || props.item.extension == '.xls'
				? wrapper(<FontAwesomeIcon icon={faFileExcel} style={{ color: 'green', fontSize: '2.4rem' }} />)
				: wrapper(<FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '2.4rem' }} />);
		}
		case 'link': {
			return (
				<div className="flex w-full sm:w-1/2 mb-16 px-16" key={props.item.id}>
					<Paper
						className="min-w-128 w-128 h-128 flex items-center justify-center rounded-4 overflow-hidden"
						elevation={1}
					>
						<Typography className="font-600">LINK</Typography>
					</Paper>
					<div className="flex flex-auto flex-col justify-center items-start min-w-0 px-16">
						<Typography className="text-16 font-600 truncate w-full">{props.item.url}</Typography>
						<Typography className="truncate w-full mb-12" color="textSecondary">
							{props.item.time}
						</Typography>
						<Button
							aria-owns={anchorEl ? 'actions-menu' : null}
							aria-haspopup="true"
							onClick={handleMenuOpen}
							variant="outlined"
							size="small"
						>
							Actions
							<Icon className="text-20">arrow_drop_down</Icon>
						</Button>
						<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
							<MenuItem
								onClick={() => {
									handleMenuClose();
									props.removeAttachment(props.item.id);
								}}
							>
								Remove Attachment
							</MenuItem>
						</Menu>
					</div>
				</div>
			);
		}
		default: {
			return <FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '2.4rem' }} />;
		}
	}
}

export default CardAttachment;
