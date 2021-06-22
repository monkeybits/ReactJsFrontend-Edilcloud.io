import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import { Avatar, IconButton, Typography, Grid, Hidden } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { REJECT_PROJECT_INVITATION } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import './contact-cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const MoreOption = loadable(() => import('./MoreOption'));
const ContactCard = loadable(() => import('./ContactCard'));
const ContactsTable = loadable(() => import('./ContactsTable'));
const ContactsMultiSelectMenu = loadable(() => import('./ContactsMultiSelectMenu'));
const DeleteConfirmDialog = loadable(() => import('../../file-manager/DeleteConfirmDialog'));

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
	const { t } = useTranslation('contacts_project');
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
	};

	const handleClose = event => {
		event.stopPropagation();
		setAnchorEl(false);
	};
	const openMenu = Boolean(anchorEl);
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
				Header: t('FIRST_NAME'),
				accessor: 'name',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: t('LAST_NAME'),
				accessor: 'lastName',
				// className: 'font-bold',
				sortable: true
			},
			{
				Header: t('COMAPNY'),
				accessor: 'company',
				sortable: true
			},
			{
				Header: t('ROLE'),
				accessor: 'role',
				sortable: true
			},
			{
				Header: t('STATUS'),
				accessor: 'status',
				sortable: true
			},
			{
				Header: t('JOB_TITLE'),
				accessor: 'jobTitle',
				sortable: true
			},
			{
				Header: t('EMAIL'),
				accessor: 'email',
				sortable: true,
				Cell: ({ row }) => (
					<a className="text-default" href={`mailto:${row.original.email}`}>
						{row.original.email}
					</a>
				)
			},
			{
				Header: t('PHONE'),
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
				Header: t('ACTION'),
				// width: 128,
				sortable: false,
				Cell: ({ row }) => {
					return (
						<MoreOption
							canHaveDeleteOption={
								(getRole() == 'o' || getRole() == 'd') && userInfo.user_id != row.original.profile.id
							}
							deleteHandler={ev => {
								ev.stopPropagation();
								setUserData(row.original);
								openDeleteContactDialog();
							}}
						/>
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
			}
			return arr;
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
			case `company${filterKeyName}`:
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

	const onDeactivate = () => {
		const { id, email } = userData;
		const url = REJECT_PROJECT_INVITATION(id);
		apiCall(
			url,
			{},
			res => {
				dispatch(Actions.removeContact(email));
				colseDeleteContactDialog();
				dispatch(Actions.getContacts(routeParams));
			},
			err => {
				// console.log(err),
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
	return (
		<>
			<div className="flex items-center left-icon-btn mb-52">
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
						<Typography>{t('DELETE_CONTACT_ASK')}</Typography>
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
			{filteredData.length === 0 ? (
				<div className="flex flex-1 items-center justify-center h-full">
					<div>
						<div className="flex flex-1 mb-20px items-center justify-center ">
							<img width="600px" src="/assets/images/errors/nocontacts.png" />
						</div>
						<div className="flex flex-1 mt-30 items-center justify-center ">
							<Typography color="textSecondary" variant="h5">
								{t('NO_CONTACT_MESSAGE')}
							</Typography>
						</div>
						<div className="flex flex-1 mt-20 items-center justify-center ">
							<Typography color="textSecondary" variant="h6">
								{t('ADD_CONTACT_ADVICE')}
							</Typography>
						</div>
					</div>
				</div>
			) : viewTable ? (
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
						<Grid container spacing={12} className="team-grid mb-52">
							{filteredData.map((data, index) => {
								return (
									// company.id == data.profile?.company?.id ?
									<ContactCard
										editPermission={
											getRole() == 'o' && data.profile && userInfo.user_id != data.profile.id
										}
										onCardClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											if (data) {
												dispatch(Actions.openViewContactDialog(data));
											}
										}}
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
