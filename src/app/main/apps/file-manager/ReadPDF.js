/* =============================================================================
 TODO: ReadPDF.js
 ===============================================================================
*This File is part of Company File manager
TODO: Read PDF this file is kind PDF viewer
*/
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ReadPDF({ file, height, width }) {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const { t } = useTranslation('filemanager');

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	const previousPage = () => setPageNumber(prev => (prev != 1 ? prev - 1 : 1));
	const nextPage = () => setPageNumber(prev => (prev != numPages ? prev + 1 : numPages));
	return (
		<div>
			{/* style={{ minHeight: 385 }} */}
			<Document
				options={{
					cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
					cMapPacked: true
				}}
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page size="A4" {...{ height, width }} pageNumber={pageNumber} />
			</Document>
			<p className="text-center pdf-pagination">
				<Button onClick={previousPage} type="button">
					{'<'}
				</Button>
				{t('PAGE')} {pageNumber} {t('OF')} {numPages}
				<Button onClick={nextPage} type="button">
					{'>'}
				</Button>
			</p>
		</div>
	);
}
export default ReadPDF;
