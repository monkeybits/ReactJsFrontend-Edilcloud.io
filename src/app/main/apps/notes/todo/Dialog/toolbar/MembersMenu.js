import { Avatar, Checkbox, Icon, ListItemText, MenuItem, FormControlLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
const ToolbarMenu = loadable(() => import('./ToolbarMenu'));

function MembersMenu(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [members, setMembers] = useState([]);
	const [checkedAll, setCheckedAll] = useState(false);
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	useEffect(() => {
		setMembers(props.members);
	}, [props.members]);
	function handleMenuOpen(event) {
		stopsEvents(event);
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose(event) {
		stopsEvents(event);
		setAnchorEl(null);
	}
	const stopsEvents = event => {
		event.preventDefault();
		event.stopPropagation();
	};
	const handleChange = (event, index) => {
		event.preventDefault();
		event.stopPropagation();
		const tempMembers = members;
		tempMembers[index] = {
			...tempMembers[index],
			is_exists: event.target.checked
		};
		props.addWorkers(tempMembers);
		setMembers(tempMembers);
	};
	const handleSelectAll = (event, index) => {
		event.preventDefault();
		event.stopPropagation();
		setCheckedAll(event.target.checked);
		let tempMembers = members;
		tempMembers = tempMembers.map(d => ({ ...d, is_exists: event.target.checked }));
		props.addWorkers(tempMembers);
		setMembers(tempMembers);
		forceUpdate();
	};
	return (
		<div className="inline-block">
			<div className="custom-member-menu flex items-center" onClick={handleMenuOpen}>
				<Icon>person</Icon>
				Assign People
			</div>
			{/* <IconButton color="inherit" onClick={handleMenuOpen}>
				<Icon>account_circle</Icon>
			</IconButton> */}
			<ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
				<div className="">
					{/* <Button onClick={handleSelectAll}>Select All </Button> */}
					<FormControlLabel
						className="px-8 pt-10 m-0 flex cusotm-checkbox-label"
						control={
							<Checkbox
								// checked={state.checkedB}
								onClick={handleSelectAll}
								name="checkedB"
							/>
						}
						label="Select All"
					/>
					{!!members?.length &&
						members.map((member, index) => {
							return (
								<MenuItem onClick={stopsEvents} className="px-8" key={member.id}>
									<Checkbox
										checked={member.is_exists}
										// onClick={stopsEvents}
										onClick={e => handleChange(e, index)}
									/>
									<Avatar className="w-32 h-32" src={member.avatar} />
									<ListItemText className="mx-8">
										{member.first_name} {member.last_name}
									</ListItemText>
								</MenuItem>
							);
						})}
				</div>
			</ToolbarMenu>
		</div>
	);
}

export default MembersMenu;
