import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch, useSelector } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import GuideSubListItem from './GuideSubListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import boardReducer from 'app/main/apps/scrumboard/store/reducers/board.reducer';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
	nested: {
		paddingLeft: theme.spacing(4)
	},
	rootCard: {
		width: '80%',
		margin: '0 auto 15px'
	},
	rootCardContent: {
		padding: '0 !important',
	}
}));

export default function GuideListItem(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [isTeam, setIsTeam] = React.useState('');

	const handleClick = () => {
		setOpen(!open);
	};

	// console.log('props', props)
	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts);

	console.log('contacts', contacts.entities.length)

	useEffect(() => {
		if(contacts && contacts.entities.length > 0) {
			setIsTeam('team')
		}
	}, [contacts]);

	// console.log('isTeam', isTeam)
	// console.log('props.data.isTeam', props.data.iconSelection)

	return (
		<>
			<Card className={classes.rootCard} variant="outlined">
				<CardContent className={classes.rootCardContent}>
					<ListItem button onClick={handleClick}>
						<IconButton>
							<Icon className={props.data.iconSelection === isTeam && props.data.iconSelection !== ''
								? "text-green-400" : "text-gray-400"}>check_circle</Icon>
						</IconButton>
						<ListItemText
							primary={props.data.title}
							//  secondary={'Secondary text'}
						/>
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<GuideSubListItem data={props.data} />
					</Collapse>
				</CardContent>
			</Card>
		</>
	);
}
