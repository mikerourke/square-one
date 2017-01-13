import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import dataReducer from './data/reducer';

const rootReducer = combineReducers({
    data: dataReducer,
    form: reduxFormReducer,
});

export default rootReducer;
