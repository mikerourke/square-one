import {
    CREATE_LEAD,
    DELETE_LEAD,
    UPDATE_LEAD,
    GET_ALL_LEADS,
} from './actionTypes';

export function createLead(lead) {
    return {
        type: CREATE_LEAD,
        payload: {
            request: {
                type: 'get',
                url: `/leads/${lead.id}`,
            }
        }
    };
}

export function deleteLead(id) {
    return {
        type: DELETE_LEAD,
        payload: {
            request: {
                type: 'delete',
                url: `/leads/${id}`,
            }
        }
    };
}

export function updateLead(lead) {
    return {
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
    };
}

export function getAllLeads() {
    return {
        type: GET_ALL_LEADS,
        payload: {
            request: {
                type: 'get',
                url: `/leads`,
            }
        }
    };
}
