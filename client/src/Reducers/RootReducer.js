import { combineReducers } from 'redux';
import optimist from 'redux-optimist';
import comments from './CommentReducer';
import users from './UserReducer';
import rooms from './RoomReducer';

const RootReducer = optimist(combineReducers({
	comments,
	users,
	rooms
}));

export default RootReducer;