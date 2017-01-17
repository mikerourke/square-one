import { combineReducers } from 'redux';
import {
    leadsReducer,
    listsReducer,
    userReducer,
} from './data/reducer';

const rootReducer = combineReducers({
    leads: leadsReducer,
    lists: listsReducer,
    user: userReducer,
});

export default rootReducer;
