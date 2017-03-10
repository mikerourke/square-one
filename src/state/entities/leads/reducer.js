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

const createLeadRecord = (leadAsJs: Object) => {
    const { changes, notes } = (leadAsJs: Object);
    const changesList = new List(changes.map(change =>
        new Change(fromJS(change))));
    const notesList = new List(notes.map(note =>
        new Note(fromJS(note))));
    return new Lead(fromJS(leadAsJs))
        .set('changes', changesList)
        .set('notes', notesList);
};

const getEntitiesAsMap = leads => OrderedMap(
    [...Object.entries(leads).map(
        ([key, value]: [any, any]) => ([key, createLeadRecord(value)]),
)]);

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
                createLeadRecord(leadToSet));

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
