/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';

/* Internal dependencies */
import {
    LEAD_CREATE, LEAD_CREATE_SUCCESS, LEAD_CREATE_FAIL,
    LEAD_DELETE, LEAD_DELETE_SUCCESS, LEAD_DELETE_FAIL,
    LEAD_UPDATE, LEAD_UPDATE_SUCCESS, LEAD_UPDATE_FAIL,
    LEAD_GET_SINGLE, LEAD_GET_SINGLE_SUCCESS, LEAD_GET_SINGLE_FAIL,
    LEAD_GET_ALL, LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
} from '../action-types';
import Lead from './model';

const initialState = OrderedMap();

const mergeEntities = (state, newLeads) =>
    state.merge(newLeads.map(lead => new Lead(lead)));

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LEAD_CREATE_SUCCESS:
        case LEAD_GET_SINGLE_SUCCESS:
        case LEAD_UPDATE_SUCCESS:
            const newLead = payload.data;
            return state.set(newLead.id, new Lead(fromJS(newLead)));


        case LEAD_GET_ALL_SUCCESS:
            const responseData = payload.data;
            return mergeEntities(state, fromJS(responseData.entities.leads));

        default:
            return state;
    }
};
