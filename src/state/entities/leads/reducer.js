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
import Lead, { Note, Change } from './model';

/* Types */
import type { Action } from 'lib/types';

type EntitiesMap = Map<string, OrderedMap<*>>;
type ResultList = List<number>;
type ErrorMap = Map<string, any>;
type State = Map<string, EntitiesMap | ResultList | ErrorMap>;

const initialState = OrderedMap();

const getEntitiesAsMap = (entities) => {
    const { changes, leads, notes } = entities;
    return new Map({
        changes: OrderedMap([...Object.entries(changes).map(
                ([key, value]) => ([key, new Change(fromJS(value))]),
            )]),
        leads: OrderedMap([...Object.entries(leads).map(
                ([key, value]) => ([key, new Lead(fromJS(value))]),
            )]),
        notes: OrderedMap([...Object.entries(notes).map(
                ([key, value]) => ([key, new Note(fromJS(value))]),
            )]),
    });
};

const mergeEntities = (state: State, data: Object): State => {
    const { entities, result } = (data: Object);
    return state.merge({
        entities: getEntitiesAsMap(entities),
        result: new List(result),
        error: new Map(),
    });
};

const getStateAfterDeletion = (state: State, leadId: number): State => {
    const leadsPath = ['entities', 'leads'];
    const newLeads = state.deleteIn(leadsPath.concat([leadId.toString()]));

    const notesPath = ['entities', 'notes'];
    // $FlowIgnore
    const newNotes = state
        .getIn(notesPath)
        .filter(note => note.leadId !== leadId);

    const changesPath = ['entities', 'changes'];
    // $FlowIgnore
    const newChanges = state
        .getIn(changesPath)
        .filter(change => change.leadId !== leadId);

    return state
        .setIn(leadsPath, newLeads)
        .setIn(changesPath, newChanges)
        .setIn(notesPath, newNotes);
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
                fromJS(leadToSet));

        case LEAD_DELETE_SUCCESS:
            const { id } = (action: Object);
            return getStateAfterDeletion(state, id);


        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: entities } } = (action: Object);
            return mergeEntities(state, entities);

        default:
            return state;
    }
};
