import {
    CREATE_LEAD,
    DELETE_LEAD,
    UPDATE_LEAD,
    GET_LEAD,
    GET_ALL_LEADS,
} from './actionTypes';

export const createLead = lead => ({
    type: CREATE_LEAD,
    payload: {
        request: {
            type: 'post',
            url: '/lead',
            data: {
                id: '231',
                leadName: lead.leadName,
            }
        }
    }
});

export const deleteLead = id => ({
    type: DELETE_LEAD,
    payload: {
        request: {
            type: 'delete',
            url: `/lead/${id}`,
        }
    }
});

export const updateLead = lead => ({
    type: UPDATE_LEAD,
    payload: {
        request: {
            type: 'patch',
            data: {
                // TODO: Add data to update lead.
                leadName: lead.leadName,
            },
            url: `/lead/${lead.id}`,
        },
    }
});

export const getLead = id => ({
    type: GET_LEAD,
    id,
});

export const getAllLeads = () => ({
    type: GET_ALL_LEADS,
    payload: {
        request: {
            type: 'get',
            url: `/leads`,
        }
    },
});
