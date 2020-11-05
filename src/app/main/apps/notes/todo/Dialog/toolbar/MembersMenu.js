import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import ToolbarMenu from './ToolbarMenu';
import PersonIcon from '@material-ui/icons/Person';
import { Button } from '@material-ui/core';

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
		let tempMembers = members;
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
					<Button onClick={handleSelectAll}>Select All </Button>
					{!!members?.length &&
						members.map((member, index) => {
							return (
								<MenuItem onClick={stopsEvents} className="px-8" key={member.id}>
									<Checkbox
										checked={member.is_exists}
										onClick={stopsEvents}
										onChange={e => handleChange(e, index)}
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
