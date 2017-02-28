/* @flow */

/* External dependencies */
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';

/* Internal dependencies */
import changes from './changes/reducer';
import gui from './gui/reducer';
import leads from './leads/reducer';
import notes from './notes/reducer';
import settings from './settings/reducer';
import user from './user/reducer';

/* Types */
import type { AxiosRequestConfig } from 'axios';

/**
 * Combined Redux reducers for the application.
 */
const rootReducer = combineReducers({
    changes,
    gui,
    leads,
    notes,
    settings,
    user,
});

/**
 * Creates the global Redux store.
 */
export default (client: AxiosRequestConfig, initialState?: any) => {
    // Setup the Redux Dev Tools in Chrome:
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
                             compose;
    const middleware = [
        axiosMiddleware(client),
        thunk,
    ];

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware)),
    );
};
