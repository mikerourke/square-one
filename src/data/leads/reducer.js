import {
    CREATE_LEAD, CREATE_LEAD_SUCCESS, CREATE_LEAD_FAIL,
    DELETE_LEAD, DELETE_LEAD_SUCCESS, DELETE_LEAD_FAIL,
    UPDATE_LEAD, UPDATE_LEAD_SUCCESS, UPDATE_LEAD_FAIL,
    GET_LEAD, GET_LEAD_SUCCESS, GET_LEAD_FAIL,
    GET_ALL_LEADS, GET_ALL_LEADS_SUCCESS, GET_ALL_LEADS_FAIL,
} from './actionTypes';
import { Lead } from './model';
import { Map, fromJS } from 'immutable';

const initialState = new Map();

const mergeEntities = (state, newLeads) =>
    state.merge(newLeads.map(lead => new Lead(lead)));

const leads = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LEAD_SUCCESS:
            return state.push(new Lead(action.payload.data));

        case GET_LEAD_SUCCESS:
        case UPDATE_LEAD_SUCCESS:
            const newLead = action.payload.data;
            return state.set(newLead.id, new Lead(newLead));


        case GET_ALL_LEADS_SUCCESS:
            const responseData = action.payload.data;
            return mergeEntities(state, fromJS(responseData.entities.leads));

        default:
            return state;
    }
};

export default leads;
