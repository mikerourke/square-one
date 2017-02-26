/* @flow */

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

/* Types */
import type { Action } from 'lib/types';

type State = OrderedMap<number, Lead>;

const initialState = OrderedMap();

const mergeEntities = (state: State, newLeads: Array<Lead>) =>
    state.merge(newLeads.map(lead => new Lead(lead)));

export default (state: State = initialState, action: Action) => {
    const { payload } = action;
    switch (action.type) {
        case LEAD_CREATE_SUCCESS:
        case LEAD_GET_SINGLE_SUCCESS:
        case LEAD_UPDATE_SUCCESS:
            return state.set(payload.data.id, new Lead(fromJS(payload.data)));


        case LEAD_GET_ALL_SUCCESS:
            return mergeEntities(state, fromJS(payload.data.entities.leads));

        default:
            return state;
    }
};
