import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Drawer, Icon, Typography, IconButton, AppBar, Tabs, Tab, Box, Toolbar, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ALERTED_POSTS_TASKS, ALERTED_POSTS_ACTIVITY } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import PropTypes from 'prop-types';
import reducer from './store/reducers';
import * as Actions from './store/actions/index';
import * as NotesActions from 'app/main/apps/notes/todo/store/actions';

const PostList = loadable(() => import('app/main/apps/notes/todo/PostList'));

const useStyles = makeStyles(theme => ({
    root: {
        width: 450
    }
}));

const useStylesAccordion = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStylesTabs = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}));

function TabPanelTodo(props) {
    const dispatch = useDispatch();
    const data = useSelector(({ quickPanel }) => quickPanel.data);
    const state = useSelector(({ quickPanel }) => quickPanel.state);
    const projectAlertId = useSelector(({ quickPanel }) => quickPanel.projectAlertId);
    const isShowAlertPost = useSelector(({ quickPanel }) => quickPanel.isShowAlertPost);
    const projects = useSelector(({ notesApp }) => notesApp.project.entities);
    const todos = useSelector(({ todoAppNote }) => todoAppNote.todos.todoEntities);
    const classesAccordion = useStylesAccordion();
    const classesTabs = useStylesTabs();
    const [value, setValue] = React.useState(0);
    const [tasks, setTasks] = React.useState([]);

    const classes = useStyles();
    const [listTask, setListTask] = useState([]);
	const [listActivity, setListActivity] = useState([]);
    const [distinctTask, setDistinctTask] = useState([]);

    const onlyUnique = (value, index, self) => {
		return self.indexOf(value) === index;
	}
    
    useEffect(() => {
        if (todos) {
            console.log('todos?????????????????????????????todos', todos)
            console.log('todos?????????????????????????????listTask', listTask)
            console.log('todos?????????????????????????????listActivity', listActivity)
            let taskIds = []
			listTask.map((task) => {
				taskIds = [
					...taskIds,
					task.task.id
				]
			})
			listActivity.map((activity) => {
				taskIds = [
					...taskIds,
					activity.task.id
				]
			})
            console.log('todos?????????????????????????????taskIds', taskIds)
			var distinctTask = taskIds.filter(onlyUnique);
            console.log('todos?????????????????????????????distinctTask', distinctTask)
			setDistinctTask(distinctTask)
            let arr = Object.keys(todos).map((k) => todos[k])
            // let activities = []
            // arr.map((task) => {
            //     if(task.activities && task.activities.length > 0) {
            //         activities = [
            //             ...activities,
            //             task.activities[0]
            //         ]
            //     }
            // })
            // let newTasks = []
            // arr.map((task) => {
            //     const resultArr = searchTaskById(task.id);
            //     if(resultArr.includes(task.id)) {
            //         newTasks = [
            //             ...newTasks,
            //             task
            //         ]
            //     }
            // })
            // if(newTasks && newTasks.length > 0) {
            //     // setTasks(newTasks)
            // }
            setTasks(arr)
        }
    }, [todos]);

    useEffect(() => {
        if (state) {
            getAlertPostTask();
            getAlertPostActivity();
        }
        return () => {
            setListActivity([]);
            setListTask([]);
        };
    }, [state]);

    useEffect(() => {
        if (projectAlertId !== null) {
            dispatch(NotesActions.getTodos(projectAlertId, false));
            getAlertPostTask();
            getAlertPostActivity();
        }
    }, [projectAlertId]);

    // const searchTaskById = (id) => {
    //     let result = []
    //     listTask.map((task) => {
    //         if(task.task.id === id) {
    //             result = [
    //                 ...result,
    //                 task.task.id
    //             ]
    //         }
    //     })
    //     return result
    // }

    const getAlertPostTask = () => {
        apiCall(
            ALERTED_POSTS_TASKS,
            {},
            results => {
                const items = results.map(d => ({ ...d, type: 'tasks' }));
                setListTask(items);
            },
            err => {
                // console.log(err)
            },
            METHOD.GET,
            getHeaderToken()
        );
    };

    const getAlertPostActivity = () => {
        apiCall(
            ALERTED_POSTS_ACTIVITY,
            {},
            results => {
                const items = results.map(d => ({ ...d, type: 'activity' }));
                if (projectAlertId !== null) {
                    const filteredActivity = items.filter((activity) => activity.project.id === projectAlertId)
                    setListActivity(filteredActivity);
                } else {
                    setListActivity(items);
                }
            },
            err => {
                // console.log(err)
            },
            METHOD.GET,
            getHeaderToken()
        );
    };

    const handleSelectTask = (event, id) => {
        dispatch(Actions.openAlertedPost(id))
    }

    const handleSelectActivity = (event, id) => {
        dispatch(Actions.openAlertedActivity(id))
    }

    useEffect(() => {
        dispatch(Actions.getQuickPanelData());
    }, [dispatch]);

    return (
        <Drawer
            classes={{ paper: classes.root }}
            className="alerted-post-modal-width"
            open={isShowAlertPost}
            anchor="right"
            onClose={ev => dispatch(Actions.toggleQuickPanel())}
        >
            <FuseScrollbars>
                <Toolbar className="px-4 flex justify-between items-center notifications-header">
                    <Typography className="mx-16 text-16" color="inherit">
                        Tasks & Activities
                    </Typography>
                    <div className="px-4">
                        <IconButton onClick={ev => dispatch(Actions.closeAlertPost())} color="inherit">
                            <Icon>close</Icon>
                        </IconButton>
                    </div>
                </Toolbar>
                <div className={classesTabs.root}>
                    <div className="p-16">
                        {
                            tasks && tasks.length > 0 &&
                            tasks.map((task) => (
                                <>
                                    {
                                        distinctTask.includes(task.id) &&
                                        <div>
                                            <ListItem
                                                button
                                                className="flex items-center relative w-full p-10 min-h-20 shadow border-2 font-bold bg-gray-300 hover:bg-gray-300 rounded-8 mb-16"
                                                onClick={(event) => {
                                                    handleSelectTask(event, task.id)
                                                }}
                                                // component={item.url ? NavLinkAdapter : 'li'}
                                                // to={item.url}
                                                role="button"
                                            >
                                                <Icon className="mr-8">new_releases</Icon>
                                                <ListItemText
                                                    className="text-bold"
                                                    primary={task.name}
                                                />
                                                <IconButton
                                                    disableRipple
                                                    className="w-40 h-40 -mx-12 p-0 focus:bg-transparent hover:bg-transparent"
                                                >
                                                    <Icon className="text-16 arrow-icon" color="inherit">
                                                        chevron_right
                                                    </Icon>
                                                </IconButton>
                                            </ListItem>
                                            <div className="ml-28">
                                                {
                                                    task.activities.length > 0 &&
                                                    task.activities.map((activity) => (
                                                        <ListItem
                                                            button
                                                            className="flex items-center relative w-full p-10 min-h-20 shadow mb-10 border-2 font-bold bg-gray-300 hover:bg-gray-300 rounded-8"
                                                            onClick={(event) => {
                                                                handleSelectActivity(event, activity.id)
                                                            }}
                                                            // component={item.url ? NavLinkAdapter : 'li'}
                                                            // to={item.url}
                                                            role="button"
                                                        >
                                                            <Icon className="mr-8">new_releases</Icon>
                                                            <ListItemText
                                                                className="text-bold"
                                                                primary={activity.title}
                                                            />
                                                            <IconButton
                                                                disableRipple
                                                                className="w-40 h-40 -mx-12 p-0 focus:bg-transparent hover:bg-transparent"
                                                            >
                                                                <Icon className="text-16 arrow-icon" color="inherit">
                                                                    chevron_right
                                                                </Icon>
                                                            </IconButton>
                                                        </ListItem>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            </FuseScrollbars>
        </Drawer>
    );
}

export default withReducer('quickPanel', reducer)(React.memo(TabPanelTodo));
