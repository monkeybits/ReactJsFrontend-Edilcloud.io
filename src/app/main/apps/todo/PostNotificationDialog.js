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
import {
	Dialog,
	IconButton,
	Icon,
	Typography,
	Avatar,
	Grid,
	Button,
	CircularProgress,
	Checkbox
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPROVE_LIST, EDIT_POST } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
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
	const [isFormValid, setIsFormValid] = useState(false);
	const [companyList, setCompanyList] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleChange = (event, company) => {
		const newCompanyList = [];
		let count = 0;
		companyList.map(item => {
			if (item.profile.company.id === company.profile.company.id && event.target.checked) {
				newCompanyList.push({ ...item, is_checked: true });
			} else if (item.is_checked && item.profile.company.id !== company.profile.company.id) {
				newCompanyList.push({ ...item, is_checked: true });
			} else {
				newCompanyList.push({ ...item, is_checked: false });
			}
		});
		newCompanyList.map(item => {
			if (item.is_checked) {
				count++;
			}
		});
		if (count > 0) {
			setIsFormValid(true);
		}
		setCompanyList(newCompanyList);
		// setChecked(event.target.checked);
	};

	const companies = useSelector(({ contactsApp }) => contactsApp?.contacts?.companies);
	const isNotificationDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.isNotificationDialog);
	const notificationPost = useSelector(({ todoAppNote }) => todoAppNote.todos.notificationPost);

	useEffect(() => {
		if (companies && companies.length > 0) {
			const newCompanyList = [];
			companies.map(item => {
				if ('profile' in item) {
					newCompanyList.push({ ...item, is_checked: false });
				}
			});
			setCompanyList(newCompanyList);
		}
	}, [companies, setCompanyList]);

	const handleClose = () => {
		dispatch(Actions.closeNotificationDialog());
	};

	const handleSubmit = () => {
		const companyIds = [];
		companyList.map(company => {
			if (company.is_checked) {
				companyIds.push(company.profile.company.id);
			}
		});
		setLoading(true);
		apiCall(
			EDIT_POST(notificationPost.id),
			{
				...notificationPost,
				company_ids: companyIds
			},
			res => {
				console.log(res);
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
	};

	return (
		<Dialog
			open={isNotificationDialog}
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="xs"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Select Company
			</DialogTitle>
			<DialogContent dividers>
				{companyList && companyList.length > 0 && (
					<div className="mb-24">
						{companyList.map(company => {
							return (
								<div className="flex justify-between my-6">
									<div className="flex items-center">
										<Checkbox
											checked={company.is_checked}
											onChange={event => handleChange(event, company)}
										/>
										<Typography
											variant="subtitle1"
											className="todo-title"
											// color={completed ? 'textSecondary' : 'inherit'} // in change of activity change styles
										>
											{company.profile.company.name}
										</Typography>
									</div>
									<div>
										<Avatar className="w-32 h-32" src={company.profile.company.logo} />
									</div>
								</div>
							);
						})}
					</div>
				)}
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
