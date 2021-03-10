import { Dialog } from '@material-ui/core';
import loadable from '@loadable/component';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from 'app/main/apps/scrumboard/store/actions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const BoardCardForm = loadable(() => import('./BoardCardForm'))

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	}
}));

function BoardCardDialog(props) {
	const dispatch = useDispatch();
	const cardDialogOpen = useSelector(({ scrumboardApp }) => scrumboardApp.card.dialogOpen);

	const classes = useStyles(props);

	return (
		<Dialog
			classes={{
				paper: clsx(classes.paper, 'max-w-lg w-full m-24')
			}}
			onClose={ev => dispatch(Actions.closeCardDialog())}
			open={cardDialogOpen}
		>
			<BoardCardForm />
		</Dialog>
	);
}

export default BoardCardDialog;
