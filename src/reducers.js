import { combineReducers } from 'redux';
import {
    guiReducer,
    leadsReducer,
    settingsReducer,
    userReducer,
} from './data/reducer';

const rootReducer = combineReducers({
    gui: guiReducer,
    leads: leadsReducer,
    settings: settingsReducer,
    user: userReducer,
});

export default rootReducer;
