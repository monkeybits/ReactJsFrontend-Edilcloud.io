import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';

function TodoHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ todoAppNote }) => todoAppNote.todos.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex w-full justify-between bg-blue items-center mb-0 p-20">
				<div className="mr-20">
					
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="h5" className="font-weight-900 text-white mb-4">Project Name</Typography>
						</FuseAnimate>
						<Typography variant="subtitle1" className="text-14 text-white font-weight-600">
							Via San Giovanni Bosco 3, Bariano (Bg) Italia
						</Typography>
			</div>
			<Button className="badge-btn" color="secondary" onClick={() => props.onOpen(true)}>
				Open Details
			</Button>
			</div>

			{/* <div className="flex flex-1">
				<Paper
					className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
					elevation={1}
				>
					<Hidden lgUp>
						<IconButton
							onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
							className="ml-20"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>

					<Icon color="action">search</Icon>

					<Input
						placeholder="Search"
						className="px-16"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={ev => dispatch(Actions.setSearchText(ev))}
					/>
				</Paper>
			</div> */}
		</ThemeProvider>
	);
}

export default TodoHeader;
