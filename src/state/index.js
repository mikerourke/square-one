/*
 * External dependencies
 */
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';

/*
 * Internal dependencies
 */
import { reducer as guiReducer } from './gui';
import { reducer as leadsReducer } from './leads';
import { reducer as settingsReducer } from './settings';
import { reducer as userReducer } from './user';

/**
 * Combined Redux reducers for the application.
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    gui: guiReducer,
    leads: leadsReducer,
    settings: settingsReducer,
    user: userReducer,
});

/**
 * Creates the global Redux store.
 * @param {Object} client Axios client for utilizing the API.
 * @param {Object} [initialState={}] Initial state of the Redux store.
 * @returns {Store<S>} Global Redux store.
 */
export default function configureStore(client, initialState) {
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
