import {
    CREATE_LEAD, CREATE_LEAD_SUCCESS, CREATE_LEAD_FAIL,
    DELETE_LEAD, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAIL,
    UPDATE_LEAD, UPDATE_LEAD_SUCCESS, UPDATE_LEAD_FAIL,
    GET_LEAD, GET_ALL_LEADS, GET_ALL_LEADS_SUCCESS, GET_ALL_LEADS_FAIL,
} from './actionTypes';

const normalizeLeads = leadArray => {
    let leadGroup = {};
    leadArray.forEach(lead => {
        leadGroup[lead.id] = lead;
    });
    return leadGroup;
};

const leads = (state = {}, action) => {
    switch (action.type) {
        case CREATE_LEAD_SUCCESS:
            return Object.assign({}, ...state, action.payload.data);

        case UPDATE_LEAD_SUCCESS:
            // TODO: Fix issue with state being overwritten.
            let filteredLeads = Object.keys(state).filter(lead => lead.id !== action.payload.data.id);
            return Object.assign({},
                normalizeLeads(filteredLeads),
                action.payload.data);

        case GET_LEAD:
            return state[action.id];

        case GET_ALL_LEADS_SUCCESS:
            return normalizeLeads(action.payload.data);

        default:
            return state;
    }
};

export default leads;
