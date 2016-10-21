import { combineReducers } from 'redux';
import comments from './CommentReducer';

const RootReducer = combineReducers({
	comments
});

export default RootReducer;