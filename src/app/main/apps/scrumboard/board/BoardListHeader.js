import { useForm } from '@fuse/hooks';
// import loadable from '@loadable/component';
import {
	ClickAwayListener,
	Icon,
	IconButton,
	InputAdornment,
	ListItemIcon,
	ListItemText,
	MenuItem,
	TextField,
	Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

const TippyMenu = React.lazy(() => import('app/TippyMenu'));

function BoardListHeader(props) {
	const dispatch = useDispatch();
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);

	const [anchorEl, setAnchorEl] = useState(null);
	const [formOpen, setFormOpen] = useState(false);
	const { form, handleChange, resetForm, setForm } = useForm({
		title: props.list.name
	});

	useEffect(() => {
		if (!formOpen) {
			resetForm();
		}
	}, [formOpen, resetForm]);

	useEffect(() => {
		if (formOpen && anchorEl) {
			setAnchorEl(null);
		}
	}, [anchorEl, formOpen]);

	useEffect(() => {
		setForm({ title: props.list.name });
	}, [props.list.name, setForm]);

	function handleMenuClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleOpenForm() {
		setFormOpen(true);
	}

	function handleCloseForm() {
		setFormOpen(false);
	}

	function isFormInvalid() {
		return form.title !== '';
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		if (!isFormInvalid()) {
			return;
		}
		dispatch(Actions.renameList(board.id, props.list.id, form.title));
		handleCloseForm();
	}

	return (
		<div {...props.handleProps}>
			<div className="flex items-center justify-between h-64 px-8">
				<div className="flex items-center min-w-0 px-12">
					{formOpen ? (
						<ClickAwayListener onClickAway={() => handleCloseForm()}>
							<form className="flex w-full" onSubmit={handleSubmit}>
								<TextField
									name="title"
									value={form.title}
									onChange={handleChange}
									variant="outlined"
									margin="none"
									autoFocus
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton type="submit" disabled={!isFormInvalid()}>
													<Icon>check</Icon>
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							</form>
						</ClickAwayListener>
					) : (
						<Typography className="text-16 font-600 cursor-pointer" onClick={() => handleOpenForm()}>
							{props.list.name}
						</Typography>
					)}
				</div>
				<div className="">
					<TippyMenu
						icon={
							<>
								<IconButton
									aria-owns={anchorEl ? 'actions-menu' : null}
									aria-haspopup="true"
									onClick={handleMenuClick}
									variant="outlined"
									size="small"
								>
									<Icon className="text-20">more_vert</Icon>
								</IconButton>
							</>
						}
						outsideClick
					>
						<MenuItem
							onClick={() => {
								dispatch(Actions.removeList(board.id, props.list.id));
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>delete</Icon>
							</ListItemIcon>
							<ListItemText primary="Remove List" />
						</MenuItem>
						<MenuItem onClick={() => handleOpenForm()}>
							<ListItemIcon className="min-w-40">
								<Icon>edit</Icon>
							</ListItemIcon>
							<ListItemText primary="Rename List" />
						</MenuItem>
					</TippyMenu>
				</div>
			</div>
		</div>
	);
}

export default BoardListHeader;
