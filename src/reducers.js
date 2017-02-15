import { combineReducers } from 'redux';
import {
    guiReducer,
    leadsReducer,
    settingsReducer,
    userReducer,
} from './modules/reducer';

const rootReducer = combineReducers({
    gui: guiReducer,
    leads: leadsReducer,
    settings: settingsReducer,
    user: userReducer,
});

export default rootReducer;
