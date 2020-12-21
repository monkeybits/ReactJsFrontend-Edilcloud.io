import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
const useStyles = makeStyles(theme => ({
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

export default function GuideListItem(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemText
					primary={props.index + 1}
					//  secondary={'Secondary text'}
				/>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<GuideSubListItem />
			</Collapse>
		</>
	);
}
