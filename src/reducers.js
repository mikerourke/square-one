import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dataReducer from './data/reducer';

const rootReducer = combineReducers({
    data: dataReducer,
    form: formReducer,
});

export default rootReducer;
