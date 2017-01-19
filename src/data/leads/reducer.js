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
    let leadItem;
    switch (action.type) {
        case CREATE_LEAD_SUCCESS:
            leadItem = action.payload.data[0];
            return state.push(new Lead(leadItem));

        case GET_LEAD_SUCCESS:
        case UPDATE_LEAD_SUCCESS:
            leadItem = action.payload.data[0];
            return state.set(leadItem.id, new Lead(leadItem));


        case GET_ALL_LEADS_SUCCESS:
            const responseData = action.payload.data;
            return mergeEntities(state, fromJS(responseData.entities.leads));

        default:
            return state;
    }
};

export default leads;
