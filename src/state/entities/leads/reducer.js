/* @flow */

/* External dependencies */
import {
    fromJS,
    List,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    LEAD_CREATE, LEAD_CREATE_SUCCESS, LEAD_CREATE_FAIL,
    LEAD_DELETE, LEAD_DELETE_SUCCESS, LEAD_DELETE_FAIL,
    LEAD_GET_ALL, LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
    LEAD_GET_SINGLE, LEAD_GET_SINGLE_SUCCESS, LEAD_GET_SINGLE_FAIL,
    LEAD_UPDATE, LEAD_UPDATE_SUCCESS, LEAD_UPDATE_FAIL,
} from '../../action-types';
import { Change, Lead, Note } from '../models';

/* Types */
import type { Action } from 'lib/types';

type EntitiesMap = Map<string, OrderedMap<*>>;
type ResultList = List<number>;
type ErrorMap = Map<string, any>;
type State = Map<string, EntitiesMap | ResultList | ErrorMap>;

const initialState = OrderedMap();

/**
 * Creates lists of Change and Note Records within a Lead Record.
 * @param {Object} lead Lead object to convert to a Record.
 */
const generateLeadRecord = (lead: Object) => {
    const { changes, notes } = (lead: Object);
    const changesList = new List(changes.map(change =>
        new Change(fromJS(change)).set('parentId', lead.id)));

    const notesList = new List(notes.map(note =>
        new Note(fromJS(note)).set('parentId', lead.id)));

    return new Lead(fromJS(lead))
        .set('changes', changesList)
        .set('notes', notesList);
};

/**
 * Creates Lead Record instances from the API return call.
 * @param {Array} leads Array of leads to generate Records from.
 */
const getEntitiesAsMap = leads => OrderedMap(
    [...Object.entries(leads).map(
        ([key, value]: [any, any]) => ([key, generateLeadRecord(value)]),
)]);

/**
 * Returns the new state with updated entity data and any error details.
 * @param {State} state Existing Redux state.
 * @param {Object} data Data from the API return call.
 * @returns {State} Updated state with new data.
 */
const mergeEntities = (state: State, data: Object): State => {
    const { entities: { leads }, result } = (data: Object);
    return state.merge({
        entities: getEntitiesAsMap(leads),
        result: new List(result),
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    const leadsPath = ['entities', 'leads'];
    switch (action.type) {
        case LEAD_CREATE_FAIL:
        case LEAD_DELETE_FAIL:
        case LEAD_GET_ALL_FAIL:
        case LEAD_GET_SINGLE_FAIL:
        case LEAD_UPDATE_FAIL:
            const { error } = (action: Object);
            return state.set('error', fromJS(error));

        case LEAD_CREATE_SUCCESS:
        case LEAD_GET_SINGLE_SUCCESS:
        case LEAD_UPDATE_SUCCESS:
            const { payload: { data: leadToSet } } = (action: Object);
            return state.setIn(leadsPath.concat([leadToSet.id]),
                generateLeadRecord(leadToSet));

        case LEAD_DELETE_SUCCESS:
            const { id } = (action: Object);
            return state.deleteIn(leadsPath.concat([id.toString()]));

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data } } = (action: Object);
            return mergeEntities(state, data);

        default:
            return state;
    }
};
