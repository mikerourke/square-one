/* @flow */

/* External dependencies */
import { normalize } from 'normalizr';
import axios from 'axios';

/* Internal dependencies */
import {
    LEAD_CREATE,
    LEAD_DELETE,
    LEAD_GET_ALL,
    LEAD_GET_SINGLE,
    LEAD_UPDATE,
} from '../../action-types';
import Lead from './model';
import { leadSchema, leadsSchema } from '../schema';


/* Types */
import type { Action } from 'lib/types';

const BASE_URL = '/leads';

const transformForMany = axios.defaults.transformResponse.concat((data) => {
    if (data) {
        return normalize(data, leadsSchema);
    }
    return {};
});

const transformForSingle = axios.defaults.transformResponse.concat((data) => {
    if (data) {
        return normalize(data, leadSchema);
    }
    return {};
});

export const createLead = (lead: Lead): Action => ({
    type: LEAD_CREATE,
    payload: {
        request: {
            method: 'post',
            url: BASE_URL,
            data: lead.getEntityForApiCall(),
        },
    },
});

export const deleteLead = (id: number): Action => ({
    type: LEAD_DELETE,
    payload: {
        request: {
            method: 'delete',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const getAllLeads = (): Action => ({
    type: LEAD_GET_ALL,
    payload: {
        request: {
            method: 'get',
            url: BASE_URL,
            transformResponse: transformForMany,
        },
    },
});

export const getLead = (id: number): Action => ({
    type: LEAD_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${id}`,
            transformResponse: transformForSingle,
        },
    },
});

export const updateLead = (lead: Lead): Action => ({
    type: LEAD_UPDATE,
    payload: {
        request: {
            method: 'patch',
            url: `${BASE_URL}/${lead.id}`,
            data: lead.getEntityForApiCall(),
        },
    },
});
