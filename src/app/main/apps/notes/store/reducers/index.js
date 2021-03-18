import { combineReducers } from 'redux';
import labels from './labels.reducer';
import notes from './notes.reducer';
import project from './project.reducer';
import filters from './filters.reducer';

const reducer = combineReducers({
	notes,
	labels,
	project,
	filters
});

export default reducer;
