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
            url: '/leads',
            data: {
                id: '231',
                firstName: lead.firstName,
                lastName: lead.lastName,
            }
        }
    }
});

export const deleteLead = id => ({
    type: DELETE_LEAD,
    payload: {
        request: {
            type: 'delete',
            url: `/leads/${id}`,
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
            },
            url: `/leads/${lead.id}`,
        }
    }
});

export const getLead = id => ({
    type: GET_ALL_LEADS,
    id
});

export const getAllLeads = () => ({
    type: GET_ALL_LEADS,
    payload: {
        request: {
            type: 'get',
            url: `/leads`,
        }
    }
});
