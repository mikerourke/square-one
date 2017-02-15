import {
    CREATE_LEAD,
    DELETE_LEAD,
    UPDATE_LEAD,
    GET_LEAD,
    GET_ALL_LEADS,
} from './actionTypes';
import { leadSchema } from './model';
import { normalize } from 'normalizr';
import axios from 'axios';

const defaultTransform = axios.defaults.transformResponse;

const BASE_URL = '/leads';

export const createLead = lead => ({
    type: CREATE_LEAD,
    payload: {
        request: {
            method: 'post',
            url: BASE_URL,
            data: lead,
        },
    },
});

export const deleteLead = id => ({
    type: DELETE_LEAD,
    payload: {
        request: {
            method: 'delete',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const updateLead = lead => ({
    type: UPDATE_LEAD,
    payload: {
        request: {
            method: 'patch',
            url: `${BASE_URL}/${lead.id}`,
            data: lead,
        },
    },
});

export const getLead = id => ({
    type: GET_LEAD,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const getAllLeads = () => ({
    type: GET_ALL_LEADS,
    payload: {
        request: {
            method: 'get',
            url: BASE_URL,
            transformResponse: defaultTransform.concat(data =>
                normalize(data, leadSchema)),
        },
    },
});
