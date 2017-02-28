/* @flow */

/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';

/* Internal dependencies */
import {
    LEAD_CREATE, LEAD_CREATE_SUCCESS, LEAD_CREATE_FAIL,
    LEAD_DELETE, LEAD_DELETE_SUCCESS, LEAD_DELETE_FAIL,
    LEAD_GET_ALL, LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
    LEAD_GET_SINGLE, LEAD_GET_SINGLE_SUCCESS, LEAD_GET_SINGLE_FAIL,
    LEAD_UPDATE, LEAD_UPDATE_SUCCESS, LEAD_UPDATE_FAIL,
} from '../action-types';
import Lead from './model';

/* Types */
import type { Action } from 'lib/types';
import type { Map } from 'immutable';

type State = Map<number, Lead>;

const initialState = OrderedMap();

const mergeEntities = (state: State, newLeads: Array<Lead>): State =>
    state.merge(newLeads.map(lead => new Lead(lead)));

export default (state: State = initialState, action: Action) => {
    const { payload } = (action: Object);
    switch (action.type) {
        case LEAD_CREATE_SUCCESS:
        case LEAD_GET_SINGLE_SUCCESS:
        case LEAD_UPDATE_SUCCESS:
            const { data: lead } = (payload: Object);
            return state.set(lead.id, new Lead(fromJS(lead)));


        case LEAD_GET_ALL_SUCCESS:
            const { data: {
                entities: {
                    leads = [],
                } = {},
            } } = (payload: Object);
            return mergeEntities(state, fromJS(leads));

        default:
            return state;
    }
};
