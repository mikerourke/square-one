import { combineReducers } from 'redux';
import leads from './leads/reducer';
import user from './user/reducer';

const dataReducer = combineReducers({
    leads,
    user
});

export default dataReducer;
