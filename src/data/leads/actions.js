import {
    CREATE_LEAD, CREATE_LEAD_SUCCESS, CREATE_LEAD_FAILURE,
    DELETE_LEAD, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAILURE,
    UPDATE_LEAD, UPDATE_LEAD_SUCCESS, UPDATE_LEAD_FAILURE,
    GET_ALL_LEADS, GET_ALL_LEADS_SUCCESS, GET_ALL_LEADS_FAILURE
} from './actionTypes';

export function createLead(lead) {
    return {
        types: [ CREATE_LEAD, CREATE_LEAD_SUCCESS, CREATE_LEAD_FAILURE ],
        promise: client => client.post('/leads', {data: lead})
    };
}

export function deleteLead(id) {
    return {
        types: [ DELETE_LEAD, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAILURE ],
        promise: client => client.del('/leads')
    };
}

export function updateLead(lead) {
    return {
        types: [ UPDATE_LEAD, UPDATE_LEAD_SUCCESS, UPDATE_LEAD_FAILURE ],
        promise: client => client.post('/leads', {data: lead})
    };
}

export function getAllLeads() {
    return {
        types: [ GET_ALL_LEADS, GET_ALL_LEADS_SUCCESS, GET_ALL_LEADS_FAILURE ],
        promise: client => client.get('/leads')
    };
}
