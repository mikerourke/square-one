import {
    CREATE_LEAD,
    DELETE_LEAD,
    UPDATE_LEAD,
    GET_LEAD,
    GET_ALL_LEADS,
} from './actionTypes';
import axios from 'axios';
import { leadListSchema } from '../schema';
import { normalize } from 'normalizr';

const defaultTransform = axios.defaults.transformResponse;

const normalizedResponse = (data) => {

    return defaultTransform.concat((data) => normalize(data, leadListSchema));
}

const BASE_URL = '/leads';

export const createLead = lead => ({
    type: CREATE_LEAD,
    payload: {
        request: {
            type: 'post',
            url: BASE_URL,
            data: {
                leadName: lead.leadName,
            },
        },
    },
});

export const deleteLead = id => ({
    type: DELETE_LEAD,
    payload: {
        request: {
            type: 'delete',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const updateLead = lead => ({
    type: UPDATE_LEAD,
    payload: {
        request: {
            type: 'post',
            url: `${BASE_URL}/${lead.id}`,
            data: {
                // TODO: Add data to update lead.
                leadName: lead.leadName,
                source: lead.source,
            },
        },
    },
});

export const getLead = id => ({
    type: GET_LEAD,
    payload: {
        request: {
            type: 'get',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const getAllLeads = () => ({
    type: GET_ALL_LEADS,
    payload: {
        request: {
            type: 'get',
            url: BASE_URL,
            transformResponse: defaultTransform.concat(data =>
                normalize(data, leadListSchema))
        },
    },
});
