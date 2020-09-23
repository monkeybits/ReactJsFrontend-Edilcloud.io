import _ from '@lodash';
import { Box, Button, CircularProgress, Divider } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { ADD_ATTCHMENTS_TO_TASK } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getCompressFile, getHeaderToken } from 'app/services/serviceUtils';
import React, { useRef, useState } from 'react';
import CardAttachment from './CardAttachment';
import ImagesPreview from 'app/main/apps/notes/todo/ImagesPreview';

function CreateAttachments({ taskId, attachments }) {
	const [images, setImages] = useState(null);
	const [mediaSets, setMediaSets] = useState(attachments);
	const inputFile = useRef(null);
	const [progress, setProgress] = React.useState(0);

	function handleOpenFileClick(e) {
		inputFile.current.click();
	}
	const addPhoto = async e => {
		const files = e.currentTarget.files;
		let file = [];
		for (var i = 0; i < files.length; i++) {
			file = [
				...file,
				{
					file: await getCompressFile(files[i]),
					imgPath: URL.createObjectURL(files[i]),
					fileType: files[i].type?.split('/')[0]
				}
			];
			setImages(file);
		}
	};
	const handleUpload = e => {
		var formData = new FormData();
		setProgress(0);
		if (images) {
			const acceptedFiles = images.map(d => d.file);
			let i = 0;
			for (const file of acceptedFiles) {
				formData.append('files[' + i + ']', file, file.name);
				i += 1;
			}
		}
		e.preventDefault();
		apiCall(
			ADD_ATTCHMENTS_TO_TASK(taskId),
			formData,
			res => {
				setMediaSets(res.media_set);
				setProgress(0);
			},
			err => {
				setProgress(0);
				console.log(err);
			},
			METHOD.POST,
			{
				...getHeaderToken(),
				onUploadProgress: function (progressEvent) {
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					setProgress(percentCompleted);
				}
			}
		);
		setImages(null);
	};
	return (
		<>
			<div className="mb-24">
				<input multiple type="file" id="file" ref={inputFile} onChange={addPhoto} hidden />
				{images && <ImagesPreview images={images} hideModify />}
				<Button onClick={handleOpenFileClick}>add file</Button>
			</div>
			{
				<Button onClick={handleUpload}>
					upload{' '}
					{progress && (
						<Box position="relative" display="inline-flex">
							<CircularProgress color="secondary" variant="static" value={progress} />
							<Box
								top={0}
								left={0}
								bottom={0}
								right={0}
								position="absolute"
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<Typography variant="caption" component="div" color="textSecondary">
									{progress}%
								</Typography>
							</Box>
						</Box>
					)}
				</Button>
			}
			<Divider />
			{mediaSets && mediaSets.length && (
				<div className="mb-24">
					<div className="flex items-center mt-16 mb-12">
						<Icon className="text-20" color="inherit">
							attachment
						</Icon>
						<Typography className="font-600 text-16 mx-8">Attachments</Typography>
					</div>
					<div className="flex flex-col sm:flex-row flex-wrap -mx-16">
						{mediaSets.map(item => (
							<CardAttachment
								item={item}
								card={{}}
								// makeCover={makeCover}
								// removeCover={removeCover}
								// removeAttachment={removeAttachment}
								key={item.id}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default CreateAttachments;
