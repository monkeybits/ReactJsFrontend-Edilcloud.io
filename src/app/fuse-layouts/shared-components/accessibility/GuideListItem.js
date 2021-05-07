import React, { useEffect, useState } from 'react';
// import loadable from '@loadable/component';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Collapse, Card, CardContent, Icon, IconButton } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/apps/notes/todo/store/reducers';
import { useSelector } from 'react-redux';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const GuideSubListItem = React.lazy(() => import('./GuideSubListItem'));

const useStyles = makeStyles(theme => ({
	nested: {
		paddingLeft: theme.spacing(4)
	},
	rootCard: {
		width: '100%',
		margin: '0 auto 15px',
		borderRadius: 10
	},
	rootCardContent: {
		padding: '0 !important'
	}
}));

function GuideListItem(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const todos = useSelector(({ todoAppNote }) => todoAppNote?.todos?.entities);
	const openMenu = useSelector(({ accessibilityPanel }) => accessibilityPanel.openMenu);
	const isTeam = useSelector(({ accessibilityPanel }) => accessibilityPanel.isTeam);
	const isProject = useSelector(({ accessibilityPanel }) => accessibilityPanel.isProject);
	const isTask = useSelector(({ accessibilityPanel }) => accessibilityPanel.isTask);
	const isPost = useSelector(({ accessibilityPanel }) => accessibilityPanel.isPost);
	const isDownload = useSelector(({ accessibilityPanel }) => accessibilityPanel.isDownload);

	useEffect(() => {
		if (props.data.iconSelection === openMenu) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [props, openMenu]);

	return (
		<>
			<Card className={classes.rootCard} variant="outlined">
				<CardContent className={classes.rootCardContent}>
					<ListItem button onClick={handleClick}>
						<IconButton>
							<Icon
								className={
									(props.data.iconSelection === isTeam ||
										props.data.iconSelection === isProject ||
										props.data.iconSelection === isTask ||
										props.data.iconSelection === isPost ||
										props.data.iconSelection === isDownload) &&
									props.data.iconSelection !== ''
										? 'text-green-400'
										: 'text-gray-400'
								}
							>
								check_circle
							</Icon>
						</IconButton>
						<ListItemText className="heading-title" primary={props.data.title} />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<GuideSubListItem
							data={props.data}
							todos={todos}
							isDataAvail={
								!!(
									(props.data.iconSelection === isTeam ||
										props.data.iconSelection === isProject ||
										props.data.iconSelection === isTask ||
										props.data.iconSelection === isPost ||
										props.data.iconSelection === isDownload) &&
									props.data.iconSelection !== ''
								)
							}
						/>
					</Collapse>
				</CardContent>
			</Card>
		</>
	);
}

export default withReducer('todoAppNote', reducer)(GuideListItem);
