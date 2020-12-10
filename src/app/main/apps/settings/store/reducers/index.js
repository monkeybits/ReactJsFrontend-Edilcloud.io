import { combineReducers } from 'redux';
import folders from './folders.reducer';

const reducer = combineReducers({
	folders,
});

export default reducer;
