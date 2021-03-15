/* =============================================================================
 Todo: PostNotificationDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Post Notification in dialog
*/
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import MuiDialogContent from '@material-ui/core/DialogContent';
import _ from '@lodash';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Icon, Typography, Avatar, Grid, Button, CircularProgress } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	APPROVE_LIST,
	EDIT_POST
} from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import {
	getHeaderToken
} from 'app/services/serviceUtils';
import * as Actions from '../notes/todo/store/actions';

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		flexGrow: 1
	}
}))(MuiDialogContent);

function PostNotificationDialog() {
	const dispatch = useDispatch();
	const [boards, setBoards] = useState([]);
	const [isFormValid, setIsFormValid] = useState(false);
	const [selectedCompany, setSelectedCompany] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getcompanyList();
		if(selectedCompany.length > 0) {
			setIsFormValid(true)
		}
	}, [selectedCompany]);

	const isNotificationDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.isNotificationDialog);
	const notificationPost = useSelector(({ todoAppNote }) => todoAppNote.todos.notificationPost);

	const getcompanyList = () => {
		apiCall(
			APPROVE_LIST,
			{},
			results => {
				if (Array.isArray(results)) {
					const filterdBoards = results.filter(d => d.company && d.status);
					setBoards(filterdBoards)
				}
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	
	const handleClose = () => {
		dispatch(Actions.closeNotificationDialog());
	}

	const handleSubmit = () => {
		let companyIds = []
		selectedCompany.map((company) => {
			companyIds.push(company.data.id)
		})
		setLoading(true);
		apiCall(
			EDIT_POST(notificationPost.id),
			{
				...notificationPost,
				company_ids: companyIds
			},
			res => {
				console.log(res)
				dispatch(Actions.closeNotificationDialog());
				// setPost(cp => ({ ...cp, ...res }));
				// setIsEditPost(false);
				setLoading(false);
			},
			err => {
				setLoading(false);
				console.log(err);
			},
			METHOD.PUT,
			getHeaderToken()
		);
	}

	return (
		<Dialog
            open={isNotificationDialog}
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="sm"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Select Company
			</DialogTitle>
			<DialogContent dividers>
				{
					boards &&
					boards.length > 0 &&
					<FuseChipSelect
						className="custom-dropdown mt-8 mb-48"
						onChange={value => {
							setSelectedCompany(value)
						}}
						isMulti
						// value={projectCoordinators}
						placeholder="test"
						textFieldProps={{
							// onChange: e => retrieveDataAsynchronously(e.target.value),
							variant: 'outlined'
						}}
						variant="fixed"
						options={boards.map(board => ({
							data: board.company,
							value: board.company.name,
							label: (
								<span className="flex items-center">
									<Avatar className="w-32 h-32" src={board.company.logo} />
									<span className="mx-8">
										{board.company.name}
									</span>
								</span>
							)
						}))}
						noOptionsMessage={() => 'Insert Company'}
						// variant="outlined"
					/>
				}
				<Grid item xs={12}>
					<div className="inline-block">
						<Button
						 	onClick={handleSubmit}
							variant="contained"
							color="primary"
							className="justify-start d-inline-block mb-20"
							aria-label="LOG IN"
							disabled={!isFormValid}
						>
							Send
							{loading && <CircularProgress size={20} color="secondary" />}
						</Button>
					</div>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}

export default PostNotificationDialog;
