import { useForm, useUpdateEffect } from '@fuse/hooks';
import _ from '@lodash';
// import loadable from '@loadable/component';
import {
	Icon,
	IconButton,
	LinearProgress,
	List,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Typography
} from '@material-ui/core';
import React, { useCallback, useRef, useState } from 'react';

const TippyMenu = React.lazy(() => import('app/TippyMenu'));
const CardAddChecklistItem = React.lazy(() => import('./CardAddChecklistItem'));
const CardChecklistItem = React.lazy(() => import('./CardChecklistItem'));
const CardChecklistName = React.lazy(() => import('./CardChecklistName'));

function CardChecklist(props) {
	const { onCheckListChange, checklist, index } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const { form, setInForm } = useForm(checklist);
	const checkListNameRef = useRef();

	useUpdateEffect(() => {
		onCheckListChange(form, index);
	}, [form, index, onCheckListChange]);

	function handleOpenNameForm() {
		handleMenuClose();
		checkListNameRef.current.openForm();
	}

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	function handleNameChange(name) {
		setInForm('name', name);
	}

	const handleListItemChange = useCallback(
		(item, _index) => {
			setInForm(`checkItems[${_index}]`, item);
		},
		[setInForm]
	);

	function handleListItemRemove(id) {
		setInForm('checkItems', _.reject(form.checkItems, { id }));
	}

	function checkItemsChecked() {
		return _.sum(form.checkItems.map(x => (x.checked ? 1 : 0)));
	}

	function handleListItemAdd(item) {
		setInForm('checkItems', [...form.checkItems, item]);
	}

	if (!form) {
		return null;
	}
	return (
		<div className="mb-24">
			<div className="flex items-center justify-between mt-16 mb-12">
				<div className="flex items-center">
					<Icon className="text-20">check_box</Icon>
					<CardChecklistName name={form.name} onNameChange={handleNameChange} ref={checkListNameRef} />
				</div>
				<div className="">
					<TippyMenu
						icon={
							<>
								<IconButton
									aria-owns={anchorEl ? 'actions-menu' : null}
									aria-haspopup="true"
									onClick={handleMenuOpen}
									variant="outlined"
									size="small"
								>
									<Icon className="text-20">more_vert</Icon>
								</IconButton>
							</>
						}
						outsideClick
					>
						<MenuItem onClick={props.onRemoveCheckList}>
							<ListItemIcon className="min-w-40">
								<Icon>delete</Icon>
							</ListItemIcon>
							<ListItemText primary="Remove Checklist" />
						</MenuItem>
						<MenuItem onClick={handleOpenNameForm}>
							<ListItemIcon className="min-w-40">
								<Icon>edit</Icon>
							</ListItemIcon>
							<ListItemText primary="Rename Checklist" />
						</MenuItem>
					</TippyMenu>
				</div>
			</div>

			<div className="">
				<div className="flex items-center -mx-6">
					<Typography className="flex font-600 mx-6">
						{`${checkItemsChecked()} / ${form.checkItems.length}`}
					</Typography>
					<LinearProgress
						className="flex flex-1 mx-6"
						variant="determinate"
						color="secondary"
						value={(100 * checkItemsChecked()) / form.checkItems.length}
					/>
				</div>
				<List className="">
					{form.checkItems.map((checkItem, _index) => (
						<CardChecklistItem
							item={checkItem}
							key={checkItem.id}
							index={_index}
							onListItemChange={handleListItemChange}
							onListItemRemove={() => handleListItemRemove(checkItem.id)}
						/>
					))}
					<CardAddChecklistItem onListItemAdd={item => handleListItemAdd(item)} />
				</List>
			</div>
		</div>
	);
}

export default CardChecklist;
