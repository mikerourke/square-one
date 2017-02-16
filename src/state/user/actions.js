/*
 * Internal dependencies
 */
import {
    USER_GET,
    USER_GET_INFO,
    USER_LOGIN,
    USER_LOGOUT,
} from '../action-types';

const BASE_URL = '/users';

export const getUser = value => ({
    type: USER_GET,
    payload: value,
});

export const getUserInfo = user => ({
    type: USER_GET_INFO,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${user.username}`,
        },
    },
});

export const auth = (username, password) => ({
    type: USER_LOGIN,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${username}`,
        },
    },
});

export const logout = user => ({
    type: USER_LOGOUT,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${user.username}`,
        },
    },
});
