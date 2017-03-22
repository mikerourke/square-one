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
    LEAD_ITEM_CREATE,
    LEAD_ITEM_DELETE,
    LEAD_ITEM_UPDATE,
} from '../../action-types';
import { Change, Lead, Message, Note } from '../models';
import { leadsSchema } from '../schema';


/* Types */
import type { Action } from 'lib/types';

type ChildItem = Change | Message | Note;

const BASE_URL = '/leads';

export const createLead = (lead: Lead): Action => ({
    type: LEAD_CREATE,
    payload: {
        request: {
            method: 'post',
            url: BASE_URL,
            data: lead.toJS(),
        },
    },
});

export const deleteLead = (id: number): Action => ({
    type: LEAD_DELETE,
    payload: {
        id,
        request: {
            method: 'delete',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const getLead = (id: number): Action => ({
    type: LEAD_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
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
            transformResponse:
                axios.defaults.transformResponse.concat((data) => {
                    if (data) {
                        return normalize(data, leadsSchema);
                    }
                    return {};
                }),
        },
    },
});

export const updateLead = (lead: Lead): Action => ({
    type: LEAD_UPDATE,
    payload: {
        request: {
            method: 'patch',
            url: `${BASE_URL}/${lead.id}`,
            data: lead.toJS(),
        },
    },
});

export const createItemInLead = (
    leadId: number, group: string, item: ChildItem): Action => ({
        type: LEAD_ITEM_CREATE,
        payload: {
            leadId,
            group,
            request: {
                method: 'post',
                url: `${BASE_URL}/${leadId}/${group}`,
                data: item.toJS(),
            },
        },
    });

export const deleteItemInLead = (
    leadId: number, group: string, itemId: number): Action => ({
        type: LEAD_ITEM_DELETE,
        payload: {
            leadId,
            group,
            itemId,
            request: {
                method: 'delete',
                url: `${BASE_URL}/${leadId}/${group}/${itemId}`,
            },
        },
    });

export const updateItemInLead = (
    leadId: number, group: string, item: ChildItem): Action => ({
        type: LEAD_ITEM_UPDATE,
        payload: {
            leadId,
            group,
            request: {
                method: 'patch',
                url: `${BASE_URL}/${leadId}/${group}/${item.id}`,
                data: item.toJS(),
            },
        },
    });
