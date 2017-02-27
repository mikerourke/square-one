/* External dependencies */
import configureStore from 'redux-mock-store';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

/**
 * Object used for performing testing that mirrors the database.
 */
const mockDb = {
    leads: [{
        id: 1,
        leadName: 'Steve Leadsman',
        contactName: '',
        source: 'Other',
        leadFee: 25,
        phone: '(630) 123-4567',
        email: 'steve@leads.com',
        address: '123 Yorktown Shopping Center, Lombard, IL 60148, USA',
        lat: 41.83931079999999,
        lng: -88.00729280000002,
        description: 'This is a lead',
        status: 'New',
        assignTo: 'Chuckles',
        createdAt: '2017-02-02 14:53:35.764000',
        updatedAt: '2017-02-02 14:53:35.764000',
    }, {
        id: 2,
        leadName: 'Nancy Leadelstein',
        contactName: '',
        source: 'Saw Sign',
        leadFee: 25,
        phone: '(630) 123-4567',
        email: 'nancy@leads.com',
        address: '',
        lat: 0,
        lng: 0,
        description: 'This is another lead',
        status: 'Existing',
        assignTo: '',
        createdAt: '2017-02-02 14:53:35.764000',
        updatedAt: '2017-02-02 14:53:35.764000',
    },
    {
        id: 3,
        leadName: 'Paco Leadrojo',
        contactName: '',
        source: 'Saw Sign',
        leadFee: 25,
        phone: '(630) 123-4567',
        email: 'paco@leads.com',
        address: '',
        lat: 0,
        lng: 0,
        description: 'This is a third lead',
        status: 'New',
        assignTo: '',
        createdAt: '2017-02-02 14:53:35.764000',
        updatedAt: '2017-02-02 14:53:35.764000',
    }],
    users: [{
        id: 1,
        username: 'mike',
        firstName: 'Mike',
        lastName: 'Rourke',
        title: 'Warlock',
        isLoggedIn: 'false',
        password: 'mike',
        accessLevel: 'admin',
    }],
    settings: [{
        id: 1,
        category: 'lists',
        settingName: 'sources',
        data: [
            { id: 1, value: 'Did work in area' },
            { id: 2, value: 'Facebook' },
            { id: 3, value: 'Flyer' },
            { id: 4, value: 'HomeAdvisor' },
            { id: 5, value: 'Saw Sign' },
        ],
    },
    {
        id: 2,
        category: 'lists',
        settingName: 'leadStatuses',
        data: [
            { id: 1, value: 'New' },
            { id: 2, value: 'Selling' },
            { id: 3, value: 'Won' },
            { id: 4, value: 'Qualified' },
            { id: 5, value: 'Lost' },
        ],
    },
    {
        id: 3,
        category: 'general',
        settingName: 'companyInfo',
        data: {
            companyName: 'Legend',
            address: '123 Company Lane',
            phone: '(630) 123-5555'
        },
    }],
};

const client = axios.create({
    responseType: 'json',
});

const mockClient = new MockAdapter(client);

/**
 * Mock Redux store with middleware.
 */
const middleware = [
    axiosMiddleware(client),
    thunk,
];
const mockStore = configureStore(middleware);

export {
    mockClient,
    mockDb,
    mockStore,
};
