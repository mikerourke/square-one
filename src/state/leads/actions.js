/* External dependencies */
import { normalize } from 'normalizr';
import axios from 'axios';

/* Internal dependencies */
import {
    LEAD_CREATE,
    LEAD_DELETE,
    LEAD_UPDATE,
    LEAD_GET_ALL,
    LEAD_GET_SINGLE,
} from '../action-types';
import { leadSchema } from './model';

const defaultTransform = axios.defaults.transformResponse;

const BASE_URL = '/leads';

export const createLead = lead => ({
    type: LEAD_CREATE,
    payload: {
        request: {
            method: 'post',
            url: BASE_URL,
            data: lead,
        },
    },
});

export const deleteLead = id => ({
    type: LEAD_DELETE,
    payload: {
        request: {
            method: 'delete',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const updateLead = lead => ({
    type: LEAD_UPDATE,
    payload: {
        request: {
            method: 'patch',
            url: `${BASE_URL}/${lead.id}`,
            data: lead,
        },
    },
});

export const getLead = id => ({
    type: LEAD_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const getAllLeads = () => ({
    type: LEAD_GET_ALL,
    payload: {
        request: {
            method: 'get',
            url: BASE_URL,
            transformResponse: defaultTransform.concat(data =>
                normalize(data, leadSchema)),
        },
    },
});
