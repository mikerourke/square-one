/* @flow */

/* Internal dependencies */
import {
    SESSION_LOGIN,
    SESSION_LOGOUT,
} from '../action-types';

/* Types */
import type { Action } from 'lib/types';

export const login = (
    username: string,
    password: string,
): Action => ({
    type: SESSION_LOGIN,
    payload: {
        request: {
            method: 'post',
            url: '/login',
            data: { username, password },
        },
    },
});

export const logout = (username: string): Action => ({
    type: SESSION_LOGOUT,
    payload: {
        request: {
            method: 'post',
            url: '/logout',
            data: { username },
        },
    },
});
