/* =============================================================================
 Todo: CreatePostDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Edit activity view in dialog
*/
import _ from '@lodash';
import loadable from '@loadable/component';
import {
    Dialog,
    IconButton,
    Typography
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { useTranslation } from 'react-i18next';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const EditActivityForm = loadable(() => import('./EditActivityForm'));

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

function EditActivityTodoDialog() {
    const { t } = useTranslation('dashboard');
    const dispatch = useDispatch();
    const editActivityTodoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.editActivityTodoDialog);

    function closeTodoDialog() {
        return dispatch(Actions.closeEditActivityTodoDialog());
    }

    return (
        <Dialog
            open={editActivityTodoDialog}
            onClose={closeTodoDialog}
            fullWidth
            maxWidth="sm"
            className="rs-dialog-sm-full custom-modal-new timeline-modal"
        >
            <DialogTitle id="customized-dialog-title" onClose={closeTodoDialog}>
                Edit Activity
			</DialogTitle>
			<DialogContent dividers>
                <EditActivityForm />
            </DialogContent>
        </Dialog>
    );
}

export default EditActivityTodoDialog;
