/* =============================================================================
 TODO:DownloadPdf.js
 ===============================================================================
*This file is part of project list page 
TODO: genrate report
*/
import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import 'jspdf/dist/polyfills.es.js';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EXPORT_DATA } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
	const dispatch = useDispatch();
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation('projects');
	return (
		<div className="tc mb4 mt2">
			{/*
    Getting pixel height in milimeters:
    https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
  */}
			<div id="myMm" style={{ height: '1mm' }} />

			<div
				size="small"
				ClassName="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeSmall MuiButton-sizeSmall"
				onClick={() => {
					setLoading(true);
					apiCall(
						EXPORT_DATA(pid),
						{},
						d => {
							toast.success(d);
							setLoading(false);
						},
						err => {
							setLoading(false);
							toast.error(err);
						},
						METHOD.POST,
						getHeaderToken()
					);
				}}
			>
				{label} {loading && <CircularProgress size={20} color="white" className="ml-20" />}
			</div>
		</div>
	);
};

export default DownloadPdf;
