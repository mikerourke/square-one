/* External dependencies */
import configureStore from 'redux-mock-store';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

const client = axios.create({
    responseType: 'json',
});
export const mockClient = new MockAdapter(client);

/**
 * Mock Redux store with middleware.
 */
const middleware = [
    axiosMiddleware(client),
    thunk,
];
export const createMockStore = configureStore(middleware);
