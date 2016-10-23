import { combineReducers } from 'redux';
import optimist from 'redux-optimist';
import comments from './CommentReducer';

const RootReducer = optimist(combineReducers({
	comments
}));

export default RootReducer;