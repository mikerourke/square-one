import {
    GET_USER,
    GET_USER_INFO,
    LOGIN,
    LOGOUT,
} from './actionTypes';

const BASE_URL = '/users';

export const getUser = value => ({
    type: GET_USER,
    payload: value,
});

export const getUserInfo = user => ({
    type: GET_USER_INFO,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${user.username}`,
        },
    },
});

export const auth = (username, password) => ({
    type: LOGIN,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${username}`,
        },
    },
});

export const logout = user => ({
    type: LOGOUT,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${user.username}`,
        },
    },
});
