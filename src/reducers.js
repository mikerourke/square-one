import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import leadsReducer from './data/leads/reducer';
import userReducer from './data/user/reducer';

const rootReducer = combineReducers({
    leads: leadsReducer,
    user: userReducer,
    form: formReducer,
});

export default rootReducer;
