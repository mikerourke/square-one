import config from 'config';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import mockDb from '../../tools/api/db.json';

const client = axios.create({
    responseType: 'json',
});

const middleware = [
    axiosMiddleware(client),
    thunk,
];

const mockClient = new MockAdapter(client);
const mockStore = configureStore(middleware);

export {
    mockClient,
    mockDb,
    mockStore,
};
