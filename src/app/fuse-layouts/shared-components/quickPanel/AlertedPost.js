import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Drawer, Icon, Typography, IconButton, Box, Toolbar, LinearProgress } from '@material-ui/core';
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

function AlertPost(props) {
    const dispatch = useDispatch();
    const state = useSelector(({ quickPanel }) => quickPanel.state);
    const isShowAlertedPost = useSelector(({ quickPanel }) => quickPanel.isShowAlertedPost);
    const taskAlertId = useSelector(({ quickPanel }) => quickPanel.taskAlertId);
    const activityAlertId = useSelector(({ quickPanel }) => quickPanel.activityAlertId);
    const classesTabs = useStylesTabs();

    const classes = useStyles();
    const [listTask, setListTask] = useState([]);
    const [listActivity, setListActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        if (taskAlertId !== null) {
            getAlertPostTask();
        }
        if (activityAlertId !== null) {
            getAlertPostActivity();
        }
    }, [taskAlertId, activityAlertId]);

    const getAlertPostTask = () => {
        setIsLoading(true)
        apiCall(
            ALERTED_POSTS_TASKS,
            {},
            results => {
                const items = results.map(d => ({ ...d, type: 'tasks' }));
                if (taskAlertId !== null) {
                    const filteredTask = items.filter((task) => task.task.id === taskAlertId)
                    setListTask(filteredTask);
                } else {
                    setListTask(items);
                }
                setIsLoading(false)
            },
            err => {
                // console.log(err)
            },
            METHOD.GET,
            getHeaderToken()
        );
    };

    const getAlertPostActivity = () => {
        setIsLoading(true)
        apiCall(
            ALERTED_POSTS_ACTIVITY,
            {},
            results => {
                const items = results.map(d => ({ ...d, type: 'activity' }));
                if (activityAlertId !== null) {
                    const filteredActivity = items.filter((activity) => activity.sub_task.id === activityAlertId)
                    setListActivity(filteredActivity);
                } else {
                    setListActivity(items);
                }
                setIsLoading(false)
            },
            err => {
                // console.log(err)
            },
            METHOD.GET,
            getHeaderToken()
        );
    };

    useEffect(() => {
        dispatch(Actions.getQuickPanelData());
    }, [dispatch]);

    return (
        <Drawer
            classes={{ paper: classes.root }}
            className="alerted-post-modal-width hide-overlay"
            open={isShowAlertedPost}
            anchor="right"
            onClose={ev => dispatch(Actions.closeAlertedPost())}
        >
            <FuseScrollbars>
                <Toolbar className="px-4 flex justify-between items-center notifications-header">
                    <Typography className="mx-16 text-16" color="inherit">
                        Alerted posts
                    </Typography>
                    <div className="px-4">
                        <IconButton onClick={ev => dispatch(Actions.closeAlertedPost())} color="inherit">
                            <Icon>close</Icon>
                        </IconButton>
                    </div>
                </Toolbar>
                <div className={classesTabs.root}>
                    <div className="bg-post-section write-post-img-full">
                        {
                            isLoading ? (
								<div className="flex flex-1 flex-col items-center justify-center h-full">
									<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
										Loading...
									</Typography>
									<LinearProgress className="w-xs" color="secondary" />
								</div>
							) : (
                                <>
                                    {
                                        taskAlertId !== null &&
                                        <PostList posts={listTask} showPrject />
                                    }
                                    {
                                        activityAlertId !== null &&
                                        <PostList posts={listActivity} showPrject showTask />
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </FuseScrollbars>
        </Drawer>
    );
}

export default withReducer('quickPanel', reducer)(React.memo(AlertPost));
