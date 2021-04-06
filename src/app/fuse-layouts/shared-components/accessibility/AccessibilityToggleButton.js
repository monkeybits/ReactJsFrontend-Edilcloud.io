import React, { useEffect, useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Fab, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import * as Actions from './store/actions';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_POST_FOR_TASK } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';

const useStyles = makeStyles({
	addButton: {
		position: 'fixed',
		right: 90,
		bottom: 25,
		zIndex: 999999
	}
});
function AccessibilityToggleButton(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [posts, setPosts] = React.useState([]);
	const [quickStartCount, setQuickStartCount] = React.useState(0);

	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts?.entities);
	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);
	const todosNote = useSelector(({ todoAppNote }) => todoAppNote?.todos?.entities);
	const accessibilityPanelAppState = useSelector(({ accessibilityPanel }) => accessibilityPanel.isDownloadApp);
	const isOpenQuickStart = useSelector(({ accessibilityPanel }) => accessibilityPanel.openMenu);
	// const count = useSelector(({ accessibilityPanel }) => accessibilityPanel.count);
	const accessibilityPanelApp = localStorage.getItem('downloadApp');

	useEffect(() => {
		setPosts([]);
		if (todosNote) {
			getPosts();
		}
	}, [todosNote]);

	const getPosts = () => {
		if (todosNote && Object.keys(todosNote).length > 0) {
			apiCall(
				GET_POST_FOR_TASK(todosNote[0].id),
				{},
				res => {
					setPosts(res.results);
				},
				err => {
					console.log(err);
				},
				METHOD.GET,
				getHeaderToken()
			);
		}
	};

	useEffect(() => {
		if (contacts && contacts.length > 0) {
			setQuickStartCount(1)
		}
	}, [contacts]);

	useEffect(() => {
		if (projects && projects.length > 0) {
			setQuickStartCount(2)
		}
	}, [projects]);

	useEffect(() => {
		if (todosNote && Object.keys(todosNote).length > 0) {
			setQuickStartCount(3)
		}
	}, [todosNote]);

	useEffect(() => {
		if (posts && posts.length > 0) {
			setQuickStartCount(4)
		}
	}, [posts]);

	useEffect(() => {
		if (accessibilityPanelApp === 'true' || accessibilityPanelAppState) {
			setQuickStartCount(5)
		}
	}, [accessibilityPanelApp, accessibilityPanelAppState]);

	return (
		<FuseAnimate animation="transition.expandIn" delay={300}>
			<Fab
				variant="extended"
				color="primary"
				aria-label="accessibility_new"
				className={clsx(classes.addButton, 'custom-accessibility-btn mr-8 mb-8')}
				onClick={ev => dispatch(Actions.toggleAccessibility())}
			>
				<span>Vuoi un aiuto? {quickStartCount}/7</span>
				{/* <Icon>accessibility_new</Icon> */}
			</Fab>
		</FuseAnimate>
	);
}

// AccessibilityToggleButton.defaultProps = {
// 	children: <Icon>notifications_active</Icon>
// };

export default AccessibilityToggleButton;
