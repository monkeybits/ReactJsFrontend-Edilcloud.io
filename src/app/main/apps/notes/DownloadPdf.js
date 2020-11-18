import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@material-ui/core';
import 'jspdf/dist/polyfills.es.js';

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

const DownloadPdf = ({ id, label }) => (
	<div className="tc mb4 mt2">
		{/*
    Getting pixel height in milimeters:
    https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
  */}
		<div id="myMm" style={{ height: '1mm' }} />

		<Button
			className="pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
			onClick={() => {
				const input = document.getElementById(id);
				input.classList.add('p-40');
				const inputHeightMm = pxToMm(input.offsetHeight);
				const a4WidthMm = pxToMm(input.offsetWidth);
				const a4HeightMm = 297;
				const a4HeightPx = mmToPx(a4HeightMm);
				const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm / a4HeightMm) + 1;
				console.log({
					input,
					inputHeightMm,
					a4HeightMm,
					a4HeightPx,
					numPages,
					range: range(0, numPages),
					comp: inputHeightMm <= a4HeightMm,
					inputHeightPx: input.offsetHeight
				});

				html2canvas(input, {
					height: input.offsetHeight * 1.2,
					width: input.offsetWidth
					// allowTaint: true,
					// scrollX: 0, scrollY: -window.scrollY
				}).then(canvas => {
					const imgData = canvas.toDataURL('image/jpeg');
					console.log({ imgData });
					let pdf = '';
					// Document of a4WidthMm wide and inputHeightMm high
					if (inputHeightMm > a4HeightMm) {
						// elongated a4 (system print dialog will handle page breaks)
						pdf = new jsPDF('p', 'mm', [inputHeightMm + 24, a4WidthMm]);
					} else {
						// standard a4
						pdf = new jsPDF();
					}

					pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width * 0.2, canvas.height * 0.2, 'a', 'FAST');
					pdf.save(`${id}.pdf`);
				});

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

export default DownloadPdf;
