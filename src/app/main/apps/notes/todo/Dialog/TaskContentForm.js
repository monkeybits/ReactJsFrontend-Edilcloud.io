import PropTypes from 'prop-types';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useDebounce, useForm, useUpdateEffect } from '@fuse/hooks';
import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import LabelModel from 'app/main/apps/scrumboard/model/LabelModel';
import * as Actions from '../store/actions';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardActivity from './activity/CardActivity';
import CardAttachment from './attachment/CardAttachment';
import CardChecklist from './checklist/CardChecklist';
import CardComment from './comment/CardComment';
import CheckListMenu from './toolbar/CheckListMenu';
import DueMenu from './toolbar/DueMenu';
import LabelsMenu from './toolbar/LabelsMenu';
import MembersMenu from './toolbar/MembersMenu';
import OptionsMenu from './toolbar/OptionsMenu';
import { Button, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `wrapped-tab-${index}`,
		'aria-controls': `wrapped-tabpanel-${index}`
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

function TaskContentForm(props) {
	const dispatch = useDispatch();
	const taskContentData = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog.data);
	const [value, setValue] = React.useState('tab1');
	let labels = [
		{
			id: '26022e4129ad3a5sc28b36cd',
			name: 'High Priority',
			class: 'bg-red text-white'
		},
		{
			id: '56027e4119ad3a5dc28b36cd',
			name: 'Design',
			class: 'bg-orange text-white'
		},
		{
			id: '5640635e19ad3a5dc21416b2',
			name: 'App',
			class: 'bg-blue text-white'
		},
		{
			id: '6540635g19ad3s5dc31412b2',
			name: 'Feature',
			class: 'bg-green text-white'
		}
	];
	let activities = [
		{
			id: 1,
			type: 'comment',
			idMember: '56027c1930450d8bf7b10758',
			message: 'We should be able to add moment.js without any problems',
			time: '12 mins. ago'
		},
		{
			id: 2,
			type: 'comment',
			idMember: '36027j1930450d8bf7b10158',
			message: 'I added a link for a page that might help us deciding the colors',
			time: '30 mins. ago'
		},
		{
			id: 3,
			type: 'attachment',
			idMember: '36027j1930450d8bf7b10158',
			message: 'attached a link',
			time: '45 mins. ago'
		}
	];
	let members = [
		{
			id: '56027c1930450d8bf7b10758',
			name: 'Alice Freeman',
			avatar: 'assets/images/avatars/alice.jpg'
		},
		{
			id: '26027s1930450d8bf7b10828',
			name: 'Danielle Obrien',
			avatar: 'assets/images/avatars/danielle.jpg'
		},
		{
			id: '76027g1930450d8bf7b10958',
			name: 'James Lewis',
			avatar: 'assets/images/avatars/james.jpg'
		},
		{
			id: '36027j1930450d8bf7b10158',
			name: 'John Doe',
			avatar: 'assets/images/avatars/Velazquez.jpg'
		}
	];
	let attachments = [
		{
			id: '12027cafbe3b52ecf2ef632c',
			name: 'header-.jpg',
			src: 'assets/images/scrumboard/header-1.jpg',
			time: 'Added Nov 3 at 15:22AM',
			type: 'image'
		},
		{
			id: '55027ced1e1a12ecf1fced2a',
			name: 'header-2.jpg',
			src: 'assets/images/scrumboard/header-2.jpg',
			time: 'Added Nov 1 at 12:34PM',
			type: 'image'
		}
	];
	let checklists = [
		{
			id: 'dbfb.99bd0ad37dabc.e05046f0c824d.18f26bb524c96.78bebc8488634.240c0ee6a5e45.4cb872965',
			name: 'Pages',
			checkItems: [
				{
					id: 1,
					name: 'Login',
					checked: true
				},
				{
					id: 2,
					name: 'Register',
					checked: true
				},
				{
					id: 3,
					name: 'Lost Password',
					checked: false
				},
				{
					id: 4,
					name: 'Recover Password',
					checked: false
				},
				{
					id: 5,
					name: 'Activate Account',
					checked: false
				}
			]
		}
	];
	const { form: cardForm, handleChange, setForm, setInForm } = useForm({
		name: taskContentData?.name
	});
	const dueDate = cardForm && cardForm.due ? moment(cardForm.due).format(moment.HTML5_FMT.DATE) : '';

	// useUpdateEffect(() => {
	// 	updateCard(board.id, cardForm);
	// }, [dispatch, board.id, cardForm, updateCard]);

	function removeDue() {
		setInForm('due', null);
	}

	function toggleLabel(labelId) {
		// setInForm('idLabels', _.xor(cardForm.idLabels, [labelId]));
	}

	function toggleMember(memberId) {
		// setInForm('idMembers', _.xor(cardForm.idMembers, [memberId]));
	}

	function addCheckList(newList) {
		// setInForm('checklists', [...cardForm.checklists, newList]);
	}

	function chipChange(name, value) {
		setInForm(
			name,
			value.map(item => item.value)
		);
	}

	function addNewChip(name, value) {
		setInForm(name, [...cardForm[name], value]);
	}

	function makeCover(attachmentId) {
		setInForm('idAttachmentCover', attachmentId);
	}

	function removeCover() {
		setInForm('idAttachmentCover', '');
	}

	function removeAttachment(attachmentId) {
		setForm({
			...cardForm,
			attachments: _.reject(cardForm.attachments, { id: attachmentId }),
			idAttachmentCover: cardForm.idAttachmentCover === attachmentId ? '' : cardForm.idAttachmentCover
		});
	}

	const handleCheckListChange = useCallback(
		(item, index) => {
			setInForm(`checklists[${index}]`, item);
		},
		[setInForm]
	);

	function removeCheckList(id) {
		setInForm('checklists', _.reject(cardForm.checklists, { id }));
	}

	function commentAdd(comment) {
		// return setInForm('activities', [comment, ...cardForm.activities]);
	}
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<DialogTitle component="div" className="p-0">
				<AppBar position="static" elevation={1}>
					<Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
						<div className="flex flex-1">
							<DueMenu onDueChange={handleChange} onRemoveDue={removeDue} due={dueDate} />

							<LabelsMenu
								onToggleLabel={toggleLabel}
								labels={labels}
								// idLabels={cardForm.idLabels}
							/>

							<MembersMenu
								onToggleMember={toggleMember}
								members={members}
								// idMembers={cardForm.idMembers}
							/>

							<IconButton color="inherit">
								<Icon>attachment</Icon>
							</IconButton>

							<CheckListMenu onAddCheckList={addCheckList} />

							<OptionsMenu onRemoveCard={() => {}} />
						</div>
						<IconButton color="inherit" onClick={ev => dispatch(Actions.closeTaskContent())}>
							<Icon>close</Icon>
						</IconButton>
					</Toolbar>
				</AppBar>
			</DialogTitle>

			<DialogContent className="p-16 sm:p-24">
				<TabPanel value={value} index="tab1">
					<div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24">
						<div className="mb-16 sm:mb-0 flex items-center">
							<Typography>{'board.name'}</Typography>
							<Icon className="text-20" color="inherit">
								chevron_right
							</Icon>
							{/* {React.useMemo(() => {
							const list = card ? _.find(board.lists, _list => _list.idCards.includes(card.id)) : null;

							return <Typography>{list && list.name}</Typography>;
						}, [board, card])} */}

							<Typography>Hello</Typography>
							<Typography>Hello1</Typography>
						</div>

						<TextField
							label="Due date"
							type="date"
							name="due"
							placeholder=" Choose a due date"
							className="w-full sm:w-auto"
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon color="action">today</Icon>
									</InputAdornment>
								)
							}}
						/>
					</div>
					<div className="flex items-center mb-24">
						<TextField
							label="Title"
							type="text"
							name="name"
							variant="outlined"
							value={cardForm.name}
							onChange={handleChange}
							fullWidth
							required
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											remove_red_eye
										</Icon>
									</InputAdornment>
								)
							}}
						/>
					</div>

					<div className="w-full mb-24">
						<TextField
							label="Description"
							name="description"
							multiline
							rows="4"
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex flex-col sm:flex-row -mx-8">
						<div className="flex-1 mb-24 mx-8">
							<div className="flex items-center mt-16 mb-12">
								<Icon className="text-20" color="inherit">
									label
								</Icon>
								<Typography className="font-600 text-16 mx-8">Labels</Typography>
							</div>
							<FuseChipSelect
								placeholder="Select multiple Labels"
								isMulti
								textFieldProps={{
									variant: 'outlined'
								}}
								options={labels.map(label => ({
									value: label.id,
									label: label.name,
									class: label.class
								}))}
							/>
						</div>

						<div className="flex-1 mb-24 mx-8">
							<div className="flex items-center mt-16 mb-12">
								<Icon className="text-20" color="inherit">
									supervisor_account
								</Icon>
								<Typography className="font-600 text-16 mx-8">Members</Typography>
							</div>
							<FuseChipSelect
								className=""
								placeholder="Select multiple Members"
								isMulti
								textFieldProps={{
									variant: 'outlined'
								}}
								options={members.map(member => ({
									value: member.id,
									label: (
										<span className="flex items-center">
											<Avatar className="w-32 h-32" src={member.avatar} />
											<span className="mx-8">{member.name}</span>
										</span>
									)
								}))}
								variant="fixed"
							/>
						</div>
					</div>

					<div className="mb-24">
						<div className="flex items-center mt-16 mb-12">
							<Icon className="text-20" color="inherit">
								attachment
							</Icon>
							<Typography className="font-600 text-16 mx-8">Attachments</Typography>
						</div>
						<div className="flex flex-col sm:flex-row flex-wrap -mx-16">
							{attachments.map(item => (
								<CardAttachment
									item={item}
									card={cardForm}
									// makeCover={makeCover}
									// removeCover={removeCover}
									// removeAttachment={removeAttachment}
									key={item.id}
								/>
							))}
						</div>
					</div>
				</TabPanel>
				<TabPanel value={value} index="tab2">
					{checklists.map((checklist, index) => (
						<CardChecklist
							key={checklist.id}
							checklist={checklist}
							index={index}
							// onCheckListChange={handleCheckListChange}
							// onRemoveCheckList={() => removeCheckList(checklist.id)}
						/>
					))}
				</TabPanel>
				<TabPanel value={value} index="tab3">
					<div className="mb-24">
						<div className="flex items-center mt-16">
							<Icon className="text-20" color="inherit">
								list
							</Icon>
							<Typography className="font-600 text-16 mx-8">Activity</Typography>
						</div>
						<List className="">
							{activities.map(item => (
								<CardActivity item={item} key={item.id} members={members} />
							))}
						</List>
					</div>
					<div className="mb-24">
						<div className="flex items-center mt-16 mb-12">
							<Icon className="text-20" color="inherit">
								comment
							</Icon>
							<Typography className="font-600 text-16 mx-8">Comment</Typography>
						</div>
						<div>
							<CardComment members={members} onCommentAdd={commentAdd} />
						</div>
					</div>
				</TabPanel>
			</DialogContent>

			<DialogActions>
				<Tabs value={value} onChange={handleTabChange} aria-label="wrapped label tabs example">
					<Tab value="tab1" label="Tab 1" wrapped {...a11yProps('tab1')} />
					<Tab value="tab2" label="Tab 2" {...a11yProps('tab2')} />
					<Tab value="tab3" label="Tab 3" {...a11yProps('tab3')} />
				</Tabs>
			</DialogActions>
		</>
	);
}

export default TaskContentForm;
