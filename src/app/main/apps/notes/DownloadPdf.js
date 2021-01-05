import React from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@material-ui/core';
import 'jspdf/dist/polyfills.es.js';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import store from 'app/store';
import history from '@history';
import TodoApp from './todo/TodoApp';
import Wrapper from './Wrapper';
import TodoListItem from './todo/TodoListItem';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EXPORT_DATA } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import PostList from './todo/PostList';
import ProjectDetailContent from './ProjectDetail/ProjectDetailContent';
import FileSaver from 'file-saver';
const pxToMm = px => {
	return Math.floor(px / document.getElementById('myMm').offsetHeight);
};

const mmToPx = mm => {
	return document.getElementById('myMm').offsetHeight * mm;
};

const range = (start, end) => {
	return Array(end - start)
		.join(0)
		.split(0)
		.map(function (val, id) {
			return id + start;
		});
};

const DownloadPdf = ({ id, label, pid }) => {
	const jss = create({
		...jssPreset(),
		plugins: [...jssPreset().plugins, jssExtend(), rtl()],
		insertionPoint: document.getElementById('jss-insertion-point')
	});
	const generateClassName = createGenerateClassName();
	return (
		<div className="tc mb4 mt2">
			{/*
    Getting pixel height in milimeters:
    https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
  */}
			<div id="myMm" style={{ height: '1mm' }} />

			<Button
				size="small"
				ClassName="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
				onClick={() => {
					apiCall(
						EXPORT_DATA(pid),
						{},
						d => {
							console.log({ headers: d });
							var file = new File([d.data], `${id}.zip`);
							FileSaver.saveAs(file);
							// var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
							// FileSaver.saveAs(file);
							// dispatch(Actions.onUploadHandleLoading(false));
						},
						err => {},
						METHOD.POST,
						{
							...getHeaderToken(),
							responseType: 'blob'
							// onDownloadProgress: progressEvent => {
							// 	var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
							// 	setProgress(percentCompleted);
							// }
						},
						true
					);

					////////////////////////////////////////////////////////
					// System to manually handle page breaks
					// Wasn't able to get it working !
					// The idea is to break html2canvas screenshots into multiple chunks and stich them together as a pdf
					// If you get this working, please email me a khuranashivek@outlook.com and I'll update the article
					////////////////////////////////////////////////////////
					// range(0, numPages).forEach((page) => {
					//   console.log(`Rendering page ${page}. Capturing height: ${a4HeightPx} at yOffset: ${page*a4HeightPx}`);
					//   html2canvas(input, {height: a4HeightPx, y: page*a4HeightPx})
					//     .then((canvas) => {
					//       const imgData = canvas.toDataURL('image/png');
					//       console.log(imgData)
					//       if (page > 0) {
					//         pdf.addPage();
					//       }
					//       pdf.addImage(imgData, 'PNG', 0, 0);
					//     });
					//   ;
					// });

					// setTimeout(() => {
					//   pdf.save(`${id}.pdf`);
					// }, 5000);
				}}
			>
				{label}
			</Button>
		</div>
	);
};

export default DownloadPdf;
