/* @flow */

/* External dependencies */
import { normalize } from 'normalizr';
import axios from 'axios';

/* Internal dependencies */
import {
    CHANGE_CREATE,
    CHANGE_DELETE,
    CHANGE_GET_ALL,
    CHANGE_GET_SINGLE,
    CHANGE_UPDATE,
} from '../action-types';
import Change, { changeSchema } from './model';

/* Types */
import type { Action } from 'lib/types';

const defaultTransform = axios.defaults.transformResponse;

const BASE_URL = '/changes';

export const createChange = (change: Change): Action => ({
    type: CHANGE_CREATE,
    payload: {
        request: {
            method: 'post',
            url: BASE_URL,
            data: change,
        },
    },
});

export const deleteChange = (id: number): Action => ({
    type: CHANGE_DELETE,
    payload: {
        request: {
            method: 'delete',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const updateChange = (change: Change): Action => ({
    type: CHANGE_UPDATE,
    payload: {
        request: {
            method: 'patch',
            url: `${BASE_URL}/${change.id}`,
            data: change,
        },
    },
});

export const getChange = (id: number): Action => ({
    type: CHANGE_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const getAllChanges = (urlPrefix?: string = ''): Action => ({
    type: CHANGE_GET_ALL,
    payload: {
        request: {
            method: 'get',
            url: `${urlPrefix}${BASE_URL}`,
            transformResponse: defaultTransform.concat(data =>
                normalize(data, changeSchema)),
        },
    },
});
