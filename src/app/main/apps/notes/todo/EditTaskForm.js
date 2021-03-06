/* =============================================================================
 Todo: EditTaskForm.js
 ===============================================================================
*This File is written for Dashboard
Todo: Edit activity form fileds and submit method of edit activity written here
*/
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import { Icon, TextField, Button, CircularProgress, withStyles, InputAdornment, Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useParams } from 'react-router';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

const marks = [
	{
		value: 0
	},
	{
		value: 10
	},
	{
		value: 20
	},
	{
		value: 30
	},
	{
		value: 40
	},
	{
		value: 50
	},
	{
		value: 60
	},
	{
		value: 70
	},
	{
		value: 80
	},
	{
		value: 90
	},
	{
		value: 100
	}
];
const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
	root: {
		color: '#3880ff',
		height: 2,
		padding: '15px 0'
	},
	thumb: {
		height: 28,
		width: 28,
		backgroundColor: '#fff',
		boxShadow: iOSBoxShadow,
		marginTop: -14,
		marginLeft: -14,
		'&:focus, &:hover, &$active': {
			boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				boxShadow: iOSBoxShadow
			}
		}
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 12px)',
		top: -22,
		'& *': {
			background: 'transparent',
			color: '#000'
		}
	},
	track: {
		height: 2
	},
	rail: {
		height: 2,
		opacity: 0.5,
		backgroundColor: '#bfbfbf'
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 8,
		width: 1,
		marginTop: -3
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor'
	}
})(Slider);

export default function EditTaskForm(props) {
    const { t } = useTranslation('dashboard');
    const dispatch = useDispatch();
    const taskContent = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog);
    const taskContentData = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog?.data);
    const companyDetail = useSelector(({ chatApp }) => chatApp?.company);
    const companies = useSelector(({ contactsApp }) => contactsApp.contacts.approvedCompanies);
    const getRole = () => userInfo?.extra?.profile.role;
    const projectDetail = taskContentData?.project;
    const userInfo = decodeDataFromToken();
    const [profileData, setProfileData] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [company, setCompany] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const routeParams = useParams();
    const getName = profile => `${profile.first_name} ${profile.last_name}`;
    const [taskDate, setTaskDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});
    const [value, setValue] = React.useState(0);

    useEffect(() => {
		if (companies && companies.length && taskContentData) {
            if(taskContentData?.assigned_company?.id !== undefined) {
                const company = [...companies]
				.filter(company => company.profile?.company?.id == taskContentData?.assigned_company?.id)
				.map(company => ({
					data: company,
					value: company.profile?.company?.name,
					label: (
						<span className="flex items-center">
							<Icon
								className="list-item-icon mx-6 text-20"
								style={{ color: company.profile.company?.color_project }}
								color="action"
							>
								label
							</Icon>{' '}
							{company.profile.company.name}
						</span>
					)
				}));
			    setCompany(company);
            }
		}
		if (taskContentData) {
			if (taskContentData.isGantt) {
				if (taskContentData.parent == 1) {
					// parrent 1 means its activty
					setTaskDate({
						startDate: new Date(taskContentData.datetime_start),
						endDate: new Date(taskContentData.datetime_end)
					});
					setProgress(taskContentData.progress);
					setProfileData(
						taskContentData.workers.map(profile => ({
							data: profile,
							value: getName(profile),
							label: <span className="flex items-center">{getName(profile)}</span>
						}))
					);
					getProjectCompanyTeamProfiles();
				} else {
					setTaskDate({
						startDate: new Date(taskContentData.date_start),
						endDate: new Date(taskContentData.date_end)
					});
					setProgress(taskContentData.progress);
				}
			} else {
				setTaskDate({
					startDate: new Date(taskContentData.date_start),
					endDate: new Date(taskContentData.date_end)
				});
				setProgress(taskContentData.progress);
			}
		}
	}, [companies, taskContentData]);

    const getProjectCompanyTeamProfiles = value => {
		// console.log(routeParams.id, taskContentData, value);
	};

    useEffect(() => {
		setValue(0);
	}, [taskContentData]);

    const { form: cardForm, handleChange, setForm, setInForm } = useForm({
		name: taskContentData?.parent == 1 ? taskContentData?.title : taskContentData?.name,
		description: taskContentData?.parent == 1 ? taskContentData?.description : taskContentData?.note
	});
    // const dueDate = cardForm && cardForm.due ? moment(cardForm.due).format(moment.HTML5_FMT.DATE) : '';
    
    const getIsDisabled = () =>
		getRole() == 'w' || getRole() == 'm';

    const isFormInvalid = () => cardForm.name && cardForm.name.length > 0 && taskDate.startDate && taskDate.endDate;

    const handleSubmit = () => {
		setLoading(true);
		dispatch(
			Actions.editTodo(
				{
					...cardForm,
					id: taskContentData.id,
					company,
					profile: profileData,
					progress,
					...taskDate
				},
				taskContentData.project.id,
				taskContent.type,
				() => {
					dispatch(Actions.closeEditTaskTodoDialog());
				},
				taskContentData.isGantt,
				setLoading
			)
		);
	};

    return (
        <div className="sm:mx-12">
            {getIsDisabled() && (
                <div className="flex items-center mb-24">
                    <Icon>lock</Icon> only company owner can change this details
                </div>
            )}
            <div className="flex items-center mb-24">
                <TextField
                    label={t('TITLE')}
                    disabled={getIsDisabled()}
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
            {taskContentData?.isGantt && taskContentData?.parent == 1 ? (
                <div className="mt-8 mb-16 select-dropdown">
                    <FuseChipSelect
                        isDisabled={getIsDisabled()}
                        placeholder={t('SELECT_PROFILE')}
                        variant="fixed"
                        isMulti
                        textFieldProps={{
                            label: 'Profile',
                            InputLabelProps: {
                                shrink: true
                            },
                            variant: 'outlined'
                            // onChange: e => getProjectCompanyTeamProfiles(e.target.value)
                        }}
                        onChange={value => {
                            setProfileData(value.splice(value.length - 1));
                        }}
                        value={profileData}
                        options={profiles.map(profile => ({
                            data: profile,
                            value: getName(profile),
                            label: <span className="flex items-center">{getName(profile)}</span>
                        }))}
                    />
                </div>
            ) : (
                companies &&
                !!companies.length && (
                    <div className="mt-8 mb-16 select-dropdown">
                        <FuseChipSelect
                            className=""
                            placeholder={t('SELECT_COMPANY')}
                            isDisabled={getIsDisabled()}
                            variant="fixed"
                            isMulti
                            textFieldProps={{
                                label: 'Company',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant: 'outlined'
                            }}
                            onChange={value => {
                                setCompany(value.splice(value.length - 1));
                            }}
                            value={company}
                            options={companies.map(company => ({
                                data: company,
                                value: company.company,
                                label: (
                                    <span className="flex items-center">
                                        <Icon
                                            className="list-item-icon mx-6 text-20"
                                            style={{
                                                color: company.color
                                            }}
                                            color="action"
                                        >
                                            label
                                                        </Icon>{' '}
                                        {company.company}
                                    </span>
                                )
                            }))}
                        />
                    </div>
                )
            )}
            <div className="flex -mx-4">
                <div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
                    <KeyboardDatePicker
                        label={t('START_DATE')}
                        inputVariant="outlined"
                        format="DD/MM/yyyy"
                        value={taskDate.startDate}
                        onChange={startDate => {
                            setTaskDate({
                                ...taskDate,
                                startDate
                            });
                        }}
                        className="mt-8 mb-16 w-full"
                    />
                </div>
                <div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
                    <KeyboardDatePicker
                        label={t('END_DATE')}
                        inputVariant="outlined"
                        format="DD/MM/yyyy"
                        value={taskDate.endDate}
                        onChange={endDate => {
                            setTaskDate({
                                ...taskDate,
                                endDate
                            });
                        }}
                        className="mt-8 mb-16 w-full"
                        disabled={getIsDisabled()}
                        minDate={taskDate.startDate}
                    />
                </div>
            </div>
            <div className="w-full mb-24">
                <TextField
                    label={t('DESCRIPTION')}
                    name="description"
                    value={cardForm.description}
                    disabled={getIsDisabled()}
                    onChange={handleChange}
                    multiline
                    rows="4"
                    variant="outlined"
                    fullWidth
                />
            </div>
            {taskContentData?.isGantt && taskContentData?.parent == 1 ? null : (
                <div className="mt-24 mx-12 zoom-125">
                    <IOSSlider
                        aria-label="ios slider"
                        disabled={getIsDisabled()}
                        defaultValue={0}
                        marks={marks}
                        onChange={(e, v) => setProgress(v)}
                        value={progress}
                        valueLabelDisplay="on"
                    />
                </div>
            )}
            <div className="flex justify-end mt-16">
                <Button
                    aria-label="save"
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="small"
                    disabled={!isFormInvalid() || getIsDisabled()}
                    onClick={getIsDisabled() ? () => '' : handleSubmit}
                >
                    {t('SAVE')} {loading && <CircularProgress size={15} color="secondary" />}
                </Button>
            </div>
        </div>
    );
}
