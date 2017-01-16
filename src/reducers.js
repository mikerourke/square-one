import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
    leadsReducer,
    listsReducer,
    userReducer,
} from './data/reducer';

const rootReducer = combineReducers({
    leads: leadsReducer,
    lists: listsReducer,
    user: userReducer,
    form: formReducer,
});

export default rootReducer;
