import { combineReducers } from 'redux';
import leadsReducer from './leads/reducer';
import userReducer from './user/reducer';

const dataReducer = combineReducers({
    leads: leadsReducer,
    user: userReducer,
});

export default dataReducer;
