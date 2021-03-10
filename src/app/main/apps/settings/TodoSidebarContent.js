import FuseAnimate from '@fuse/core/FuseAnimate';
import { List, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch} from 'react-redux';

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			// pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		paddingLeft: 24
	}
}));

function TodoSidebarContent(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1 border-solid">
				{/* <div className="p-24">
					<Button
						onClick={() => {
							dispatch(Actions.openNewTodoDialog());
						}}
						variant="contained"
						color="primary"
						className="w-full"
					>
						ADD TASK
					</Button>
				</div> */}

				<div className={classes.listWrapper}>
					<List>
						<ListSubheader className={classes.listSubheader} disableSticky>
							GENERAL FILTERS
						</ListSubheader>
					</List>
				</div>
			</div>
		</FuseAnimate>
	);
}

export default TodoSidebarContent;
