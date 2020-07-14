import auth from 'app/auth/store/reducers';
import chatApp from 'app/main/apps/chat/store/reducers';
import { combineReducers } from 'redux';
import fuse from './fuse';

const createReducer = asyncReducers =>
	combineReducers({
		auth,
		fuse,
		chatApp,
		...asyncReducers
	});

export default createReducer;
