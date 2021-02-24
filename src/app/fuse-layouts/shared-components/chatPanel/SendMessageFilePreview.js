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
import TippyMenu from 'app/TippyMenu';

function SendMessageFilePreview(props) {
	const [anchorEl, setAnchorEl] = useState(null);

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}
	const itemImage = () => (
		<div className="flex my-8 px-8" key={props.item.id}>
			<div className="flex items-center justify-center min-w-128 w-128 h-128 relative">
				<Paper className="rounded-4 overflow-hidden relative" elevation={1}>
					<img className="block h-128 w-128 object-cover" src={props.item.imgPath} alt="attachment" />
					<Icon className="text-20 image-close cursor-pointer" onClick={props.onRemove}>close</Icon>
				</Paper>
			</div>
		</div>
	);
	const wrapper = child => (
		<div className="flex my-8 px-8" key={props.item.id}>
			<div className="flex items-center justify-center min-w-128 w-128 h-128 relative">
				<Paper className="rounded-4 overflow-hidden" elevation={1}>
					{child}
					<Icon className="text-20 image-close cursor-pointer" onClick={props.onRemove}>close</Icon>
				</Paper>
			</div>
		</div>
	);
	switch (props.item.fileType) {
		case 'image': {
			return itemImage();
		}
		case 'audio': {
			return wrapper(<FontAwesomeIcon icon={faFileAudio} style={{ color: 'brown', fontSize: '6.4rem' }} />);
		}
		case 'video': {
			return wrapper(<FontAwesomeIcon icon={faFileVideo} style={{ color: 'red', fontSize: '6.4rem' }} />);
		}
		case 'application': {
			return props.item.extension == '.xlsx' || props.item.extension == '.xls'
				? wrapper(<FontAwesomeIcon icon={faFileExcel} style={{ color: 'green', fontSize: '6.4rem' }} />)
				: wrapper(<FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '6.4rem' }} />);
		}
		case 'link': {
			return (
				<div className="flex my-8 px-8" key={props.item.id}>
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
						<TippyMenu
							icon={
								<>
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
								</>
							}
							outsideClick
						>
							<MenuItem
								onClick={() => {
									handleMenuClose();
									props.removeAttachment(props.item.id);
								}}
							>
								Remove Attachment
							</MenuItem>
						</TippyMenu>
					</div>
				</div>
			);
		}
		default: {
			return <FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '6.4rem' }} />;
		}
	}
}

export default SendMessageFilePreview;
