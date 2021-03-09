import React from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Drawer, Icon, Typography, IconButton, AppBar, Toolbar, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import Guide from './Guide';

const useStyles = makeStyles(theme => ({
	root: {
		width: 450,
		backgroundColor: '#eff2f7'
	},
	top: {
		color: '#192d3e',
		animationDuration: '550ms',
		position: 'absolute',
		left: '50%'
	},
	circle: {
		strokeLinecap: 'round'
	}
}));

function AccessibilityPanel(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ accessibilityPanel }) => accessibilityPanel.state);
	const classes = useStyles();

	return (
		<Drawer
			classes={{ paper: classes.root }}
			className="alerted-post-modal-width"
			open={state}
			anchor="right"
			onClose={ev => dispatch(Actions.toggleAccessibility())}
		>
			<FuseScrollbars className="unset-position">
				<div className="flex flex-col">
					<div className="px-4 absolute top-0 right-0 z-20">
						<IconButton onClick={ev => dispatch(Actions.toggleAccessibility())} className="text-white">
							<Icon>close</Icon>
						</IconButton>
					</div>
					<Card className="w-full rounded-none">
						<AppBar position="inherit" elevation={0}>
							<Toolbar className="px-8 pt-36 pb-56 text-center bg-blue-500">
								<Typography variant="h5" color="inherit" className="flex-1 px-12">
									Edilcloud Quickstart
								</Typography>
							</Toolbar>
						</AppBar>
						<div className="absolute custom-quickstart-wrap w-full">
							<Guide />
						</div>
					</Card>
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('accessibilityPanel', reducer)(React.memo(AccessibilityPanel));
