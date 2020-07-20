import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { DOWNLOAD_PHOTO, DOWNLOAD_VIDEO, DOWNLOAD_DOCUMENT } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import FileSaver from 'file-saver';
import * as Actions from './store/actions';

function DetailSidebarHeader({ setProgress }) {
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.files);
	const selectedItem = useSelector(({ fileManagerApp }) => files[fileManagerApp.selectedItemId]);
	const dispatch = useDispatch();

	if (!selectedItem) {
		return null;
	}
	const onDownload = () => {
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
					var file = new File([data], `${selectedItem.title}`, {
						type: headers['content-type']
					});
					FileSaver.saveAs(file);
					dispatch(Actions.onUploadHandleLoading(false));
				},
				err => {
					dispatch(Actions.onUploadHandleLoading(false));
				},
				METHOD.GET,
				{
					...getHeaderToken(),
					responseType: 'blob',
					onDownloadProgress: progressEvent => {
						var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percentCompleted);
					}
				},
				true
			);
		}
	};
	const url =
		selectedItem.type == 'photo'
			? selectedItem.photo
			: selectedItem.type == 'video'
			? selectedItem.video
			: selectedItem.document;
	return (
		<div className="flex flex-col justify-between h-full p-4 sm:p-12">
			<div className="toolbar flex align-center justify-end">
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<IconButton>
						<Icon>delete</Icon>
					</IconButton>
				</FuseAnimate>
				<FuseAnimate animation="transition.expandIn" delay={200}>
					<IconButton onClick={onDownload}>
						<Icon>cloud_download</Icon>
					</IconButton>
				</FuseAnimate>
				<IconButton>
					<Icon>more_vert</Icon>
				</IconButton>
			</div>

			<div className="p-12">
				<FuseAnimate delay={200}>
					<Typography variant="subtitle1" className="mb-8">
						{selectedItem.title}
					</Typography>
				</FuseAnimate>
				<FuseAnimate delay={300}>
					<Typography variant="caption" className="">
						<span>Edited</span>
						<span>: {moment(selectedItem.date_last_modify).format('MMMM Do YYYY, h:mm a')}</span>
					</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default DetailSidebarHeader;
