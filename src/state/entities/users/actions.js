/* @flow */

/* External dependencies */
import { normalize } from 'normalizr';
import axios from 'axios';

/* Internal dependencies */
import {
    USER_GET_ALL,
    USER_GET_SINGLE,
} from '../../action-types';
import { usersSchema } from '../schema';

/* Types */
import type { Action } from 'lib/types';

const BASE_URL = '/users';

const transformForMany = axios.defaults.transformResponse.concat((data) => {
    if (data) {
        return normalize(data, usersSchema);
    }
    return {};
});

export const getAllUsers = (): Action => ({
    type: USER_GET_ALL,
    payload: {
        request: {
            method: 'get',
            url: BASE_URL,
            transformResponse: transformForMany,
        },
    },
});

export const getUser = (id: number): Action => ({
    type: USER_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${id}`,
        },
    },
});
