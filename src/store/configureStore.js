import config from 'config';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default (client, initialState) => {
    // Setup the Redux Dev Tools in Chrome:
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
                             compose;
    const middleware = [
        axiosMiddleware(client),
        thunk,
    ];

    // Only log state changes in development:
    if (config.environment === 'development') {
        console.log('Logging state changes...');
        const logger = createLogger();
        middleware.push(logger);
    }

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware)),
    );
};
