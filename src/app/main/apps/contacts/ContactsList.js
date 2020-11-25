import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import * as Actions from './store/actions';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import DeleteConfirmDialog from '../file-manager/DeleteConfirmDialog';
import { DEACTIVATE_MEMBER, ACTIVATE_MEMBER } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import './contact-cards.css';
import Grid from '@material-ui/core/Grid';
import ContactCard from './ContactCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { TramOutlined } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Pagination from '@material-ui/lab/Pagination';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreOption from './MoreOption';

function sortByProperty(array, property, order = 'ASC') {
	return array.sort((a, b) =>
		order === 'ASC'
			? a[property] > b[property]
				? 1
				: a[property] < b[property]
				? -1
				: 0
			: a[property] > b[property]
			? -1
			: a[property] < b[property]
			? 1
			: 0
	);
}
function ContactsList(props) {
	const dispatch = useDispatch();
	const filterKey = useSelector(({ contactsApp }) => contactsApp.contacts.filterKey);
	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
	const approved = useSelector(({ contactsApp }) => contactsApp.contacts.approved);
	const waiting = useSelector(({ contactsApp }) => contactsApp.contacts.waiting);
	const refused = useSelector(({ contactsApp }) => contactsApp.contacts.refused);
	const deactivated = useSelector(({ contactsApp }) => contactsApp.contacts.deactivated);
	const routeParams = useSelector(({ contactsApp }) => contactsApp.contacts.routeParams);

	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [userData, setUserData] = useState(null);
	const [viewTable, setViewTable] = useState(false);
	const [filteredData, setFilteredData] = useState(null);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const openDeleteContactDialog = () => setIsOpenDeleteDialog(true);
	const colseDeleteContactDialog = () => setIsOpenDeleteDialog(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = event => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = event => {
		event.stopPropagation();
		setAnchorEl(null);
	};
	const columns = React.useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.id);

					return (
						selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				Cell: ({ row }) => {
					return <Avatar alt={row.original.name} src={row.original.avatar} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'First Name',
				accessor: 'name',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Last Name',
				accessor: 'lastName',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Company',
				accessor: 'company',
				sortable: true
			},
			{
				Header: 'Role',
				accessor: 'role',
				sortable: true
			},
			{
				Header: 'Status',
				accessor: 'status',
				sortable: true
			},
			{
				Header: 'Job Title',
				accessor: 'jobTitle',
				sortable: true
			},
			{
				Header: 'Email',
				accessor: 'email',
				sortable: true,
				Cell: ({ row }) => (
					<a
						className="text-default"
						onClick={e => e.stopPropagation()}
						href={`mailto:${row.original.email}`}
					>
						{row.original.email}
					</a>
				)
			},
			{
				Header: 'Phone',
				accessor: 'phone',
				sortable: true,
				Cell: ({ row }) => (
					<a className="text-default" onClick={e => e.stopPropagation()} href={`tel:${row.original.phone}`}>
						{row.original.phone}
					</a>
				)
			},
			{
				id: 'action',
				Header: 'Action',
				sortable: false,
				Cell: ({ row }) =>
					(getRole() == 'o' || getRole() == 'd' || row.original.email == userInfo?.email) && (

						<div className="actions-dropdown relative">
							<IconButton
								aria-label="more"
								aria-controls="long-menu-table"
								aria-haspopup="true"
								onClick={handleClick}
							>
								<MoreVertIcon />
							</IconButton>
							<div className="custom-list-dropdown">
								<ul className="list-unstyled">
									<li className="py-6">
										<EditOutlinedIcon />
										Edit
									</li>
									<li className="py-6">
										<DeleteOutlineOutlinedIcon />
										Delete
									</li>
									<li className="py-6">
										<FlagOutlinedIcon />
										Report as inapropriate
									</li>
								</ul>
							</div>
						</div>

						// <div className="flex items-center">
						// 	<IconButton
						// 		onClick={ev => {
						// 			ev.stopPropagation();
						// 			dispatch(Actions.openEditContactDialog(row.original));
						// 		}}
						// 	>
						// 		<Icon>edit</Icon>
						// 	</IconButton>
						// 	<IconButton
						// 		onClick={ev => {
						// 			ev.stopPropagation();
						// 			setUserData(row.original);
						// 			openDeleteContactDialog();
						// 		}}
						// 	>
						// 		{row.original.status == 'Deactivated' ? <Icon>check</Icon> : <Icon>delete</Icon>}
						// 	</IconButton>
						// </div>
					)

				// <div className="flex items-center">
				// 	<IconButton
				// 		onClick={ev => {
				// 			ev.stopPropagation();
				// 			dispatch(Actions.openEditContactDialog(row.original));
				// 		}}
				// 	>
				// 		<Icon>edit</Icon>
				// 	</IconButton>
				// 	<IconButton
				// 		onClick={ev => {
				// 			ev.stopPropagation();
				// 			setUserData(row.original);
				// 			openDeleteContactDialog();
				// 		}}
				// 	>
				// 		{row.original.status == 'Deactivated' ? <Icon>check</Icon> : <Icon>delete</Icon>}
				// 	</IconButton>
				// </div>
			}
		],
		[dispatch, user.starred]
	);
	const setContacts = filterKey => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}
		function getFilteredArrayByKey(entities, key, _searchText) {
			if (_searchText.length === 0) {
				return entities;
			}
			return entities.filter(item => item[key] == _searchText);
		}
		let results = [];
		switch (filterKey) {
			case 'all':
				results = sortByProperty(getFilteredArray(contacts, searchText), 'name');
				let deactivatedUsers = sortByProperty(getFilteredArray(deactivated, searchText), 'name');
				setFilteredData([...results, ...deactivatedUsers]);
				break;
			case 'approved':
				results = sortByProperty(getFilteredArray(approved, searchText), 'name');
				setFilteredData(results);
				break;
			case 'waiting':
				results = sortByProperty(getFilteredArray(waiting, searchText), 'name');
				setFilteredData(results);
				break;
			case 'refused':
				results = sortByProperty(getFilteredArray(refused, searchText), 'name');
				setFilteredData(results);
				break;
			case 'deactivated':
				results = sortByProperty(getFilteredArray(deactivated, searchText), 'name');
				setFilteredData(results);
				break;
			case 'owner':
				results = sortByProperty(getFilteredArrayByKey(contacts, 'role', 'Owner'), 'name');
				setFilteredData(results);
				break;
			case 'delegate':
				results = sortByProperty(getFilteredArrayByKey(contacts, 'role', 'Delegate'), 'name');
				setFilteredData(results);
				break;
			case 'manager':
				results = sortByProperty(getFilteredArrayByKey(contacts, 'role', 'Manager'), 'name');
				setFilteredData(results);
				break;
			case 'worker':
				results = sortByProperty(getFilteredArrayByKey(contacts, 'role', 'Worker'), 'name');
				setFilteredData(results);
				break;
			default:
				results = sortByProperty(getFilteredArray(contacts, searchText), 'name');
				setFilteredData(results);
				break;
		}
	};
	useEffect(() => {
		setContacts(filterKey);
	}, [contacts, filterKey, searchText, deactivated]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no contacts!
				</Typography>
			</div>
		);
	}
	const onDeactivate = () => {
		const { id, email, status } = userData;
		let url = status == 'Deactivated' ? ACTIVATE_MEMBER(id) : DEACTIVATE_MEMBER(id);
		apiCall(
			url,
			{},
			res => {
				dispatch(Actions.removeContact(email));
				colseDeleteContactDialog();
				dispatch(Actions.getContacts(routeParams));
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	return (
		<>
			<div className="flex items-center left-icon-btn mb-24">
				<div className="single-btn rounded h-40 mr-10 sm:mr-0">
					<Hidden lgUp>
						<IconButton
							onClick={ev => {
								props.pageLayout.current.toggleLeftSidebar();
							}}
							aria-label="open left sidebar"
						>
							{/* <Icon>menuopen</Icon> */}
							<MenuOpenIcon />
						</IconButton>
					</Hidden>
				</div>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Paper
						className="flex p-4 items-center w-full h-40 px-8 py-4 bg-white search-white-box"
						elevation={1}
					>
						<Icon className="text-20" color="action">
							search
						</Icon>

						<Input
							placeholder="Search for anything"
							className="flex flex-1 px-12"
							disableUnderline
							fullWidth
							value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => dispatch(Actions.setSearchText(ev))}
						/>
					</Paper>
				</FuseAnimate>
				<div className="flex two-btn rounded h-40 ml-10">
					<IconButton onClick={() => setViewTable(false)} className={!viewTable ? 'text-default' : ''}>
						<FontAwesomeIcon icon={faTh} />
					</IconButton>
					<IconButton onClick={() => setViewTable(true)}>
						<FontAwesomeIcon icon={faList} className={viewTable ? 'text-default' : ''} />
					</IconButton>
				</div>
			</div>
			<DeleteConfirmDialog
				text={
					userData && (
						<>
							<Typography>
								Are you sure want to {userData.status == 'Deactivated' ? 'activate' : 'deactivate'} ?
							</Typography>
							{userData.status != 'Deactivated' && (
								<Typography>
									Account will be deactivated untill you not activet this user again!
								</Typography>
							)}
						</>
					)
				}
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteContactDialog}
				onYes={onDeactivate}
				onNo={colseDeleteContactDialog}
			/>
			{viewTable ? (
				<FuseAnimate animation="transition.slideUpIn" delay={200}>
					<ContactsTable
						columns={columns}
						data={filteredData}
						onRowClick={(ev, row) => {
							if (row) {
								dispatch(Actions.openViewContactDialog(row.original));
							}
						}}
					/>
				</FuseAnimate>
			) : (
				<Grid container spacing={12} className="team-grid">
					{filteredData &&
						filteredData.map((data, index) => {
							return (
								<ContactCard
									editPermission={
										getRole() == 'o' || getRole() == 'd' || data.email == userInfo?.email
									}
									{...data}
								/>
							);
						})}
				</Grid>
			)}

			<div className="flex justify-center mt-12">
				<Pagination count={10} />
			</div>
		</>
	);
}

export default ContactsList;
