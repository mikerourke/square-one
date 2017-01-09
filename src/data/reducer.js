import { combineReducers } from 'redux';
import leadReducer from './leads/reducer';
import userReducer from './users/reducer';

const dataReducer = combineReducers({
    leadReducer,
    userReducer
});

export default dataReducer;
