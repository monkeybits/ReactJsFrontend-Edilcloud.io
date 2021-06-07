/* =============================================================================
 Todo: EditTaskTodoDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Edit activity view in dialog
*/
import _ from '@lodash';
import loadable from '@loadable/component';
import {
    Dialog,
	IconButton,
	Typography,
	withStyles
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useForm } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { KeyboardDatePicker } from '@material-ui/pickers';
import * as Actions from './store/actions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const EditTaskForm = loadable(() => import('./EditTaskForm'));

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

function EditTaskTodoDialog() {
    const { t } = useTranslation('dashboard');
    const dispatch = useDispatch();
    const editTaskTodoDialog = useSelector(({ todoApp }) => todoApp.todos.editTaskTodoDialog);
    const taskContentData = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog?.data);
    const userInfo = decodeDataFromToken();
    const [profileData, setProfileData] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [company, setCompany] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const routeParams = useParams();
    const getName = profile => `${profile.first_name} ${profile.last_name}`;
    const [taskDate, setTaskDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});
    const [value, setValue] = React.useState(0);

    // this Method will be used to close the post dialog
    function closeTodoDialog() {
        return dispatch(Actions.closeEditTaskTodoDialog());
    }

    return (
        <Dialog
            // classes={{
            //     root: 'custom-modal-close'
            // }}
            open={editTaskTodoDialog}
            onClose={closeTodoDialog}
            fullWidth
            maxWidth="sm"
            className="rs-dialog-sm-full custom-modal-new timeline-modal"
        >
            <DialogTitle id="customized-dialog-title" onClose={closeTodoDialog}>
                Edit Task
			</DialogTitle>
			<DialogContent dividers>
                <EditTaskForm />
            </DialogContent>
        </Dialog>
    );
}

export default EditTaskTodoDialog;
