import _ from '@lodash';
import { Box, Button, CircularProgress, Divider, Icon, Typography } from '@material-ui/core';
import { ADD_ATTCHMENTS_TO_TASK } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { decodeDataFromToken, getCompressFile, getHeaderToken } from 'app/services/serviceUtils';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import Dropzone from 'react-dropzone';
const ImagesPreview = loadable(() => import('app/main/apps/notes/todo/ImagesPreview'));
const ImagePreviewDialog = loadable(() => import('app/ImagePreviewDialog'));
const CardAttachment = loadable(() => import('./CardAttachment'));

function CreateAttachments({ taskId, attachments, nameSpace = 'todo_project' }) {
	const { t } = useTranslation(nameSpace);
	const [images, setImages] = useState(null);
	const [mediaSets, setMediaSets] = useState([]);
	const inputFile = useRef(null);
	const [progress, setProgress] = useState(0);
	const [activtStep, setActivtStep] = useState(0);
	const [open, setOpen] = useState(false);
	const [deviceType, setDeviceType] = React.useState('');
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;

	useEffect(() => {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			setDeviceType('window phone')
		}

		if (/android/i.test(userAgent)) {
			setDeviceType('android')
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			setDeviceType('ios')
		}

		const iPad = (userAgent.match(/(iPad)/)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		if (iPad !== false) {
			setDeviceType('ios')
		}
	}, []);
	
	useEffect(() => {
		setMediaSets(attachments);
	}, [attachments]);

	useEffect(() => {
		window.updateImage = updateImage;
	}, []);

	const dataURLtoFile = (dataurl, filename) => {
		const arr = dataurl.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	};
	
	const updateImage = async string => {
		const files = [];
		const extToMimes = {
			'image/jpeg': '.jpg',
			'image/png': '.png',
			'application/pdf': '.pdf',
			'application/json': '.json',
			'application/vnd.ms-excel': '.xls',
			'text/csv': '.csv',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
			'audio/mp4': '.mp4a',
			'video/mp4': '.mp4',
			'application/mp4': '.mp4'
		};

		let randomName = '';
		for (let i = 0; i < 8; i++) {
			const random = Math.floor(Math.random() * 27);
			randomName += String.fromCharCode(97 + random);
		}

		const dataWithMimeType = string.substr(0, string.indexOf(';'));
		const mimeT = dataWithMimeType.split(':')[1];
		const fileObject = dataURLtoFile(string, randomName + extToMimes[mimeT]);
		files.push(fileObject);

		// const fileToCompress = files[0];
		try {
			// if (fileToCompress.type?.split('/')[0] == 'image') {
			// 	const compressedFile = fileToCompress;
			// 	setFile({
			// 		fileData: new File([compressedFile], compressedFile.name)
			// 	});
			// } else {
			// 	setFile({
			// 		fileData: fileToCompress
			// 	});
			// }

			let file = [];
			for (let i = 0; i < files.length; i++) {
				const fileType = files[i].type?.split('/');
				file = [
					...file,
					{
						file: fileType[0] == 'image' ? await getCompressFile(files[i]) : files[i],
						imgPath: URL.createObjectURL(files[i]),
						fileType: fileType[0],
						extension: `.${fileType[1]}`,
						type: fileType.join('/')
					}
				];
				setImages(file);
			}
		} catch (e) {
			// console.log('Error', e);
		}
	};

	const onAddPhoto = () => {
		try {
			if (window.webkit.messageHandlers) {
				window.webkit.messageHandlers.UploadImage.postMessage('Start Image Loading');
			}
		} catch (e) {
			// console.log('error', e);
		}
	};
	
	function handleOpenFileClick(e) {
		inputFile.current.click();
	}
	const addPhoto = async e => {
		const { files } = e.currentTarget;
		let file = [];
		for (let i = 0; i < files.length; i++) {
			const fileType = files[i].type?.split('/')[0];
			file = [
				...file,
				{
					file: fileType == 'image' ? await getCompressFile(files[i]) : files[i],
					imgPath: URL.createObjectURL(files[i]),
					fileType
				}
			];
			setImages(file);
		}
	};
	const handleUpload = e => {
		const formData = new FormData();
		setProgress(0);
		if (images) {
			const acceptedFiles = images.map(d => d.file);
			let i = 0;
			for (const file of acceptedFiles) {
				formData.append(`files[${i}]`, file, file.name);
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
			},
			METHOD.POST,
			{
				...getHeaderToken(),
				onUploadProgress(progressEvent) {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					setProgress(percentCompleted);
				}
			}
		);
		setImages(null);
	};
	
	return (
		<>
			{(getRole() == 'o' || getRole() == 'd') && (
				<>
					<div className="mb-24 image-center">
						<input multiple type="file" id="file" ref={inputFile} onChange={addPhoto} hidden />
						{images && <ImagesPreview images={images} hideModify />}
						<div className="flex justify-center">
											<Button
												className="add-file-btn mr-10"
												onClick={deviceType === 'ios' ? onAddPhoto : handleOpenFileClick}
											>
												{t('ADD_FILE')}
											</Button>
											{/* <p>Drag 'n' drop some files here, or click to select files</p> */}

							{
								images !== null ? (
									<Button className="upload-btn" onClick={handleUpload}>
										{t('UPLOAD')}{' '}
										{!!progress && (
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
								) : (
									<Button className="upload-btn opacity-50 cursor-not-allowed">
										{t('UPLOAD')}{' '}
									</Button>		
								)
							}
						</div>
					</div>
					<Divider />
				</>
			)}
			{mediaSets && (
				<div className="mb-24">
					<div className="flex items-center mt-16 mb-12">
						<Icon className="text-20" color="inherit">
							attachment
						</Icon>
						<Typography className="font-600 text-16 mx-8">Attachments</Typography>
					</div>
					<div className="flex flex-col sm:flex-row flex-wrap -mx-16">
						{mediaSets.map((item, i) => (
							<CardAttachment
								item={item}
								card={{}}
								setActivtStep={index => {
									setActivtStep(index);
									setOpen(true);
								}}
								index={i}
								// makeCover={makeCover}
								// removeCover={removeCover}
								// removeAttachment={removeAttachment}
								key={item.id}
							/>
						))}
					</div>
					{!!mediaSets && (
						<ImagePreviewDialog
							isOpenViewFile={open}
							imagesArray={mediaSets}
							activtStep={activtStep}
							closeViewFile={() => setOpen(false)}
							nameSpace="todo_project"
						/>
					)}
				</div>
			)}
		</>
	);
}

export default CreateAttachments;
