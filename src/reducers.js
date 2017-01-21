import { combineReducers } from 'redux';
import {
    leadsReducer,
    settingsReducer,
    userReducer,
} from './data/reducer';

const rootReducer = combineReducers({
    leads: leadsReducer,
    settings: settingsReducer,
    user: userReducer,
});

export default rootReducer;
