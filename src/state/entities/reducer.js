import { combineReducers } from 'redux-immutable';
import leads from './leads/reducer';

export default combineReducers({
    leads,
});
