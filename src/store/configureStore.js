import { createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from '../services/api/middleware/clientMiddleware';
// import rootReducer from '../reducers';
import rootReducer from '../data/reducer';
import thunk from 'redux-thunk';

export default function configureStore(client, initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [createMiddleware(client), thunk];

    return createStore (
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
}
