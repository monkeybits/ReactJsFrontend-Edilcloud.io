import { Button, Icon, MenuItem, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFile,
	faFileExcel,
	faFileVideo
} from '@fortawesome/free-regular-svg-icons';
import loadable from '@loadable/component';
const TippyMenu = loadable(() => import('app/TippyMenu'))

function CardAttachment(props) {
	const [anchorEl, setAnchorEl] = useState(null);

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}
	const itemImage = () => (
		<div className="flex w-full sm:w-1/2 mb-16 px-16" key={props.item.id} onClick={props.openImage}>
			<div className="flex items-center justify-center min-w-128 w-128 h-128">
				<Paper className="rounded-4 overflow-hidden" elevation={1}>
					<img className="block h-128 w-128 object-cover" src={props.item.media_url} alt="attachment" />
				</Paper>
			</div>
		</div>
	);
	const wrapper = child => (
		<div className="chat-pdf-box border-1 rounded mt-16">
			<div className="flex w-full px-16" key={props.item.id}>
				<div className="flex items-center justify-center ht-11 w-full">
					<Paper className="rounded-4 overflow-hidden" elevation={1}>
						{child}
					</Paper>
				</div>
			</div>
			{type() == 'application' && (
				<Typography className="font-600 p-10 rounded bg-body">
					{props.item.name}
					{props.item.extension}
				</Typography>
			)}
		</div>
	);
	let type = () => (props.item.type ? props.item.type.split('/')[0] : '');
	switch (type()) {
		case 'image': {
			return itemImage();
		}
		case 'audio': {
			return <audio controls src={props.item.media_url} />;
		}
		case 'video': {
			return wrapper(<FontAwesomeIcon icon={faFileVideo} style={{ color: 'red', fontSize: '4.5rem' }} />);
		}
		case 'application': {
			return props.item.extension == '.xlsx' || props.item.extension == '.xls'
				? wrapper(<FontAwesomeIcon icon={faFileExcel} style={{ color: 'green', fontSize: '4.5rem' }} />)
				: wrapper(<FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '4.5rem' }} />);
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
			return <FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '4.5rem' }} />;
		}
	}
}

export default CardAttachment;
