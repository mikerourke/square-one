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
import gui from './gui/reducer';
import leads from './leads/reducer';
import settings from './settings/reducer';
import user from './user/reducer';

/**
 * Combined Redux reducers for the application.
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    gui,
    leads,
    settings,
    user,
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
