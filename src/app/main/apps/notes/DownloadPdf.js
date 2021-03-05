/* =============================================================================
 TODO:DownloadPdf.js
 ===============================================================================
*This file is part of project list page 
TODO: genrate report
*/
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button, CircularProgress } from '@material-ui/core';
import 'jspdf/dist/polyfills.es.js';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import store from 'app/store';
import history from '@history';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EXPORT_DATA } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import FileSaver from 'file-saver';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ProjectDetailContent from './ProjectDetail/ProjectDetailContent';
import PostList from './todo/PostList';
import TodoListItem from './todo/TodoListItem';
import Wrapper from './Wrapper';
import TodoApp from './todo/TodoApp';

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
