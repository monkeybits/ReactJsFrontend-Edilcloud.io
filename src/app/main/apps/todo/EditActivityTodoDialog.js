/* =============================================================================
 Todo: CreatePostDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Edit activity view in dialog
*/
import _ from '@lodash';
import loadable from '@loadable/component';
import {
    Dialog
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { useTranslation } from 'react-i18next';

const EditActivityForm = loadable(() => import('./EditActivityForm'));

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

function EditActivityTodoDialog() {
    const { t } = useTranslation('dashboard');
    const dispatch = useDispatch();
    const editActivityTodoDialog = useSelector(({ todoApp }) => todoApp.todos.editActivityTodoDialog);

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
            <EditActivityForm />
        </Dialog>
    );
}

export default EditActivityTodoDialog;
