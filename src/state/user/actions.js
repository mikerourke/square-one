/* @flow */

/* Internal dependencies */
import {
    USER_GET,
    USER_GET_INFO,
    USER_LOGIN,
    USER_LOGOUT,
} from '../action-types';
import User from './model';

/* Types */
import type { Action } from 'lib/types';

const BASE_URL = '/users';

// TODO: Fix this action.
export const getUser = (value: string) => ({
    type: USER_GET,
    payload: value,
});

export const getUserInfo = (user: User): Action => ({
    type: USER_GET_INFO,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${user.username}`,
        },
    },
});

export const auth = (username: string, password: string): Action => ({
    type: USER_LOGIN,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${username}`,
        },
    },
});

export const logout = (user: User): Action => ({
    type: USER_LOGOUT,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}?username=${user.username}`,
        },
    },
});
