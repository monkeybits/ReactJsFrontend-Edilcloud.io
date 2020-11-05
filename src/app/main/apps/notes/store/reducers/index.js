import { combineReducers } from 'redux';
import labels from './labels.reducer';
import notes from './notes.reducer';
import project from './project.reducer';

const reducer = combineReducers({
	notes,
	labels,
	project
});

export default reducer;
