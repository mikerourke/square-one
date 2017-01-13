import {
    CREATE_LEAD, CREATE_LEAD_SUCCESS, CREATE_LEAD_FAIL,
    DELETE_LEAD, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAIL,
    UPDATE_LEAD, UPDATE_LEAD_SUCCESS, UPDATE_LEAD_FAIL,
    GET_ALL_LEADS, GET_ALL_LEADS_SUCCESS, GET_ALL_LEADS_FAIL
} from './actionTypes';

const leads = (state = [], action) => {
    switch (action.type) {
        case CREATE_LEAD_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.payload.data)
            ];

        case UPDATE_LEAD_SUCCESS:
            return [
                ...state.filter(lead => lead.id !== action.lead.id),
                Object.assign({}, action.payload.data)
            ];

        case GET_ALL_LEADS_SUCCESS:
            return action.payload.data;

        default:
            return state;
    }
};

export default leads;
