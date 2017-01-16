import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';

export default function configureStore(client, initialState) {
    // Setup the Redux Dev Tools in Chrome:
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
                             compose;
    const middleware = [
        axiosMiddleware(client),
        thunk
    ];

    return createStore (
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
}
