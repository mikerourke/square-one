/* @flow */

/* External dependencies */
import { fromJS, List, Map, OrderedMap } from 'immutable';

/* Internal dependencies */
import {
    LEAD_CREATE, LEAD_CREATE_SUCCESS, LEAD_CREATE_FAIL,
    LEAD_DELETE, LEAD_DELETE_SUCCESS, LEAD_DELETE_FAIL,
    LEAD_GET_ALL, LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
    LEAD_GET_SINGLE, LEAD_GET_SINGLE_SUCCESS, LEAD_GET_SINGLE_FAIL,
    LEAD_UPDATE, LEAD_UPDATE_SUCCESS, LEAD_UPDATE_FAIL,
} from '../../action-types';
import { Lead, Note, Change } from './model';

/* Types */
import type { Action } from 'lib/types';

type EntitiesMap = Map<string, OrderedMap<*>>;
type ResultList = List<number>;
type State = Map<string, EntitiesMap | ResultList>;

const initialState = OrderedMap();

const getEntitiesAsMap = (entities) => {
    const { changes, leads, notes } = entities;
    return new Map({
        changes: OrderedMap([...Object.entries(changes).map(
                ([key, value]) => ([[key], new Change(fromJS(value))]),
            )]),
        leads: OrderedMap([...Object.entries(leads).map(
                ([key, value]) => ([[key], new Lead(fromJS(value))]),
            )]),
        notes: OrderedMap([...Object.entries(notes).map(
                ([key, value]) => ([[key], new Note(fromJS(value))]),
            )]),
    });
};

const mergeEntities = (state: State, data: Object): State => {
    const { entities, result } = (data: Object);
    return state.merge({
        entities: getEntitiesAsMap(entities),
        result: new List(result),
    });
};

export default (state: State = initialState, action: Action) => {
    const { payload } = (action: Object);
    switch (action.type) {
        case LEAD_CREATE_SUCCESS:
        case LEAD_GET_SINGLE_SUCCESS:
        case LEAD_UPDATE_SUCCESS:
            const { data: lead } = (payload: Object);
            const newLead = fromJS(lead);
            return state.setIn(['leads', 'entities', 'leads', lead.id],
                newLead);

        case LEAD_GET_ALL_SUCCESS:
            const { data } = (payload: Object);
            return mergeEntities(state, data);

        default:
            return state;
    }
};
