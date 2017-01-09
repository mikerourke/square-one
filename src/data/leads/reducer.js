import {
    CREATE_LEAD, CREATE_LEAD_SUCCESS, CREATE_LEAD_FAILURE,
    DELETE_LEAD, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAILURE,
    UPDATE_LEAD, UPDATE_LEAD_SUCCESS, UPDATE_LEAD_FAILURE,
    GET_ALL_LEADS, GET_ALL_LEADS_SUCCESS, GET_ALL_LEADS_FAILURE
} from './actionTypes';

export default function leadReducer(state = [], action) {
    switch (action.type) {
        case CREATE_LEAD:
            return [
                ...state,
                Object.assign({}, action.lead)
            ];

        case UPDATE_LEAD:
            return [
                ...state.filter(lead => lead.id !== action.lead.id),
                Object.assign({}, action.req.data.leadId)
            ];

        case GET_ALL_LEADS:
            console.log(JSON.stringify(action));
            return [
                ...state,
                action.result
            ];

        default:
            return state;
    }
};
