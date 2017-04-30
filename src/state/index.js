/* @flow */

/* External dependencies */
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import { Map } from 'immutable';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';

/* Internal dependencies */
import entities from './entities/reducer';
import gui from './gui/reducer';
import session from './session/reducer';
import settings from './settings/reducer';

/* Types */
import type { AxiosRequestConfig } from 'axios';

/**
 * Combined Redux reducers for the application.
 */
const rootReducer = combineReducers({
    entities,
    gui,
    session,
    settings,
    routing: routerReducer,
});

/**
 * Creates the global Redux store.
 */
const configureStore = (client: AxiosRequestConfig) => {
    // Setup the Redux Dev Tools in Chrome:
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
                             compose;
    const middleware = [
        axiosMiddleware(client),
        thunk,
    ];

    return createStore(
        rootReducer,
        Map(),
        composeEnhancers(applyMiddleware(...middleware)),
    );
};

export default configureStore;
