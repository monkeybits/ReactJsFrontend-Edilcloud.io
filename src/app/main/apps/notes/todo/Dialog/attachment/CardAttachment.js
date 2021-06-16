import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFile
} from '@fortawesome/free-regular-svg-icons';
import { ATTACHMENT_DOWNLOAD } from 'app/services/apiEndPoints';
import FileSaver from 'file-saver';
import * as Actions from 'app/main/apps/notes/todo/store/actions';
import { useDispatch } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import * as ICONS from 'app/main/apps/constants';

import TippyMenu from 'app/TippyMenu';

function CardAttachment(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}
	const handleDownload = () => {
		const { item } = props;
		const type = () => (item.type ? item.type.split('/')[0] : '');

		apiCall(
			ATTACHMENT_DOWNLOAD(item.task, item.id),
			{},
			({ headers, data }) => {
				const image = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
				const file = `data:${headers['content-type'].toLowerCase()};base64,${image}`;
				// console.log({ file });
				if (window) {
					// console.log('listenning to flutterInAppWebViewPlatformReady');
					// console.log(window.flutter_inappwebview);
					if (type() == 'image') {
						if (window.DownloadFiles) {
							window.DownloadFiles.postMessage(item.photo);
						}
						if (window.flutter_inappwebview)
							window.flutter_inappwebview.callHandler('DownloadFiles', item.photo);
					}
					if (type() == 'video') {
						if (window.DownloadFiles) {
							window.DownloadFiles.postMessage(item.video);
						}
						if (window.flutter_inappwebview)
							window.flutter_inappwebview.callHandler('DownloadFiles', item.video);
					} else {
						if (window.DownloadFiles) {
							window.DownloadFiles.postMessage(item.document);
						}
						if (window.flutter_inappwebview)
							window.flutter_inappwebview.callHandler('DownloadFiles', item.document);
					}
				}
				FileSaver.saveAs(file);
				// var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
				// FileSaver.saveAs(file);
			},
			err => {},
			METHOD.GET,
			{
				...getHeaderToken(),
				responseType: 'arraybuffer',
				onDownloadProgress: progressEvent => {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					dispatch(Actions.setUploadPercentage(percentCompleted));
				}
			},
			true
		);
	};
	const itemImage = () => (
		<div className="flex w-full sm:w-1/2 mb-16 px-16" key={props.item.id}>
			<div className="flex items-center justify-center min-w-128 w-128 h-128">
				<Paper className="rounded-4 overflow-hidden" elevation={1}>
					<img className="block h-96 max-h-full" src={props.item.media_url} alt="attachment" />
				</Paper>
			</div>
			<div className="flex flex-auto flex-col justify-center items-start min-w-0 px-16">
				<div className="flex items-center w-full">
					<Typography className="text-16 font-600 truncate flex-shrink">{props.item.name}</Typography>

					<Icon className="text-orange-300 text-20 mx-4">star</Icon>
				</div>
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
					<MenuItem onClick={() => props.setActivtStep(props.index)}>View</MenuItem>
					<MenuItem onClick={handleDownload}>Download</MenuItem>
				</TippyMenu>
			</div>
		</div>
	);
	const wrapper = child => (
		<div className="flex w-full sm:w-1/2 mb-16 px-16" key={props.item.id}>
			<div className="flex items-center justify-center min-w-128 w-128 h-128">
				<Paper className="rounded-4 overflow-hidden" elevation={1}>
					{child}
					{/* <img className="block max-h-full max-h-full" src={props.item.media_url} alt="attachment" /> */}
				</Paper>
			</div>
			<div className="flex flex-auto flex-col justify-center items-start min-w-0 px-16">
				<div className="flex items-center w-full">
					<Typography className="text-16 font-600 truncate flex-shrink">{props.item.name}</Typography>

					<Icon className="text-orange-300 text-20 mx-4">star</Icon>
				</div>
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
					<MenuItem onClick={() => props.setActivtStep(props.index)}>View</MenuItem>
					<MenuItem onClick={handleDownload}>Download</MenuItem>
				</TippyMenu>
			</div>
		</div>
	);
	const type = () => (props.item.type ? props.item.type.split('/')[0] : '');
	switch (type()) {
		case 'image': {
			return itemImage();
		}
		case 'audio': {
			return <audio controls src={props.item.media_url} />;
		}
		case 'video': {
			return wrapper(<img className="mr-8" src={ICONS.VIDEO_ICON_PATH} />);
		}
		case 'application': {
			return props.item.extension == '.xlsx' || props.item.extension == '.xls'
				? wrapper(<img className="mr-8" src={ICONS.EXCEL_ICON_PATH} />)
				: wrapper(<img className="mr-8" src={ICONS.GENERIC_ICON_PATH} />);
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
			return wrapper(
				<FontAwesomeIcon
					className="block max-h-full max-h-full"
					icon={faFile}
					style={{ color: 'red', fontSize: '4.5rem' }}
				/>
			);
		}
	}
}

export default CardAttachment;
