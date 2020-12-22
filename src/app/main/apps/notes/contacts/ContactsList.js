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
import { DEACTIVATE_MEMBER, ACTIVATE_MEMBER, DELETE_MEMBER_FROM_PROJECT } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import DeleteConfirmDialog from '../../file-manager/DeleteConfirmDialog';
import './contact-cards.css';
import Grid from '@material-ui/core/Grid';
import ContactCard from './ContactCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Pagination from '@material-ui/lab/Pagination';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
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
	const companies = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.companies);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const filterKey = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.filterKey);
	const filterKeyName = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.filterKeyName);
	const contacts = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.entities);
	const approved = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.approved);
	const waiting = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.waiting);
	const refused = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.refused);
	const deactivated = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.deactivated);
	const routeParams = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.routeParams);
	const options = ['Edit', 'Delete', 'Report as inapropriate'];

	const searchText = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.searchText);
	const user = useSelector(({ contactsAppProject }) => contactsAppProject.user);
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [userData, setUserData] = useState(null);
	const [viewTable, setViewTable] = useState(false);
	const [filteredData, setFilteredData] = useState(null);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const openDeleteContactDialog = () => setIsOpenDeleteDialog(true);
	const colseDeleteContactDialog = () => setIsOpenDeleteDialog(false);
	const [anchorEl, setAnchorEl] = React.useState(false);
	const handleClick = event => {
		setAnchorEl(true);
		event.preventDefault();
		event.stopPropagation();
		setTimeout(() => {
			console.log({ currentTarget: event.currentTarget, anchorEl: Boolean(anchorEl) });
		}, 1000);
	};

	const handleClose = event => {
		event.stopPropagation();
		setAnchorEl(false);
	};
	let openMenu = Boolean(anchorEl);
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
					<a className="text-default" href={`mailto:${row.original.email}`}>
						{row.original.email}
					</a>
				)
			},
			{
				Header: 'Phone',
				accessor: 'phone',
				sortable: true,
				Cell: ({ row }) => (
					<a className="text-default" href={`tel:${row.original.phone}`}>
						{row.original.phone}
					</a>
				)
			},
			{
				id: 'action',
				Header: 'Action',
				// width: 128,
				sortable: false,
				Cell: ({ row }) => {
					console.log(user, row.original, userInfo);
					return (
						(getRole() == 'o' || getRole() == 'd') &&
						userInfo.user_id != row.original.profile.id && (
							<MoreOption
								canHaveDeleteOption={
									row.original.profile && userInfo.user_id != row.original.profile.id
								}
								deleteHandler={ev => {
									ev.stopPropagation();
									setUserData(row.original);
									openDeleteContactDialog();
								}}
							/>
						)
					);
				}
			}
		],
		[dispatch, user.starred]
	);
	const removeDuplicates = (arr = []) =>
		arr.reduce((arr, current) => {
			const x = arr.find(item => (item.id && current.id ? item.id === current.id : false));
			if (!x) {
				return arr.concat([current]);
			} else {
				return arr;
			}
		}, []);
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
		function getFilteredCompanyArrayByKey(entities) {
			return entities.filter(item => item.profile.company.id == filterKeyName);
		}
		let results = [];
		switch (filterKey) {
			case 'all':
				results = removeDuplicates(sortByProperty(getFilteredArray(contacts, searchText), 'name'));
				setFilteredData(results);
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
			case 'company' + filterKeyName:
				results = sortByProperty(getFilteredCompanyArrayByKey(contacts), 'name');
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
	}, [contacts, filterKey, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		if (props.loadingApprove || props.loadingRefuse || props.loadingWaiting) {
			return (
				<div className="flex flex-1 flex-col items-center justify-center">
					<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
						Loading contacts...
					</Typography>
					<LinearProgress className="w-xs" color="secondary" />
				</div>
			);
		} else {
			return (
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no contacts!
					</Typography>
				</div>
			);
		}
	}
	const onDeactivate = () => {
		const { id, email } = userData;
		let url = DELETE_MEMBER_FROM_PROJECT(id);
		apiCall(
			url,
			{},
			res => {
				dispatch(Actions.removeContact(email));
				colseDeleteContactDialog();
				dispatch(Actions.getContacts(routeParams));
			},
			err => console.log(err),
			METHOD.DELETE,
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
					<>
						<Typography>Are you sure want to delete ?</Typography>
						{/* {filterKey != 'deactivated' && (
							<Typography>Account will be deactivated untill you not activet this user again!</Typography>
						)} */}
					</>
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
				filteredData && (
					<>
						{/* <Typography className="truncate">{d.profile.company.name}</Typography>
								<Divider className="my-12" /> */}
						<Grid container spacing={12} className="team-grid">
							{filteredData.map((data, index) => {
								return (
									//company.id == data.profile?.company?.id ?
									<ContactCard
										editPermission={
											(getRole() == 'o' || getRole() == 'd') &&
											userInfo.user_id != data.profile.id
										}
										{...data}
									/>
								); // : null;
							})}
						</Grid>
					</>
				)
			)}
			{/* <div className="flex justify-center mt-12">
				<Pagination count={10} />
			</div> */}
		</>
	);
}

export default ContactsList;
