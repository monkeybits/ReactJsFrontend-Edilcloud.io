import { combineReducers } from 'redux';
import chat from './chat.reducer';
import contacts from './contacts.reducer';
import sidebars from './sidebars.reducer';
import user from './user.reducer';
import company from './company.reducer';

const reducer = combineReducers({
	sidebars,
	user,
	contacts,
	chat,
	company
});

export default reducer;
