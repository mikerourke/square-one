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
    LEAD_ITEM_CREATE, LEAD_ITEM_CREATE_SUCCESS, LEAD_ITEM_CREATE_FAIL,
    LEAD_ITEM_DELETE, LEAD_ITEM_DELETE_SUCCESS, LEAD_ITEM_DELETE_FAIL,
    LEAD_ITEM_UPDATE, LEAD_ITEM_UPDATE_SUCCESS, LEAD_ITEM_UPDATE_FAIL,
} from '../../action-types';
import { Change, Lead, Message, Note } from '../models';

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
    const { changes, messages, notes } = (lead: Object);
    const changesList = new List(changes.map(change =>
        new Change(fromJS(change)).set('parentId', lead.id)));

    const messagesList = new List(messages.map(message =>
        new Message(fromJS(message)).set('parentId', lead.id)));

    const notesList = new List(notes.map(note =>
        new Note(fromJS(note)).set('parentId', lead.id)));

    return new Lead(fromJS(lead))
        .set('changes', changesList)
        .set('messages', messagesList)
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

const getNewItem = (data: Object, leadId: number, group: string) => {
    switch (group) {
        case 'changes':
            return new Change(fromJS(data)).set('parentId', leadId);

        case 'messages':
            return new Message(fromJS(data)).set('parentId', leadId);

        case 'notes':
            return new Note(fromJS(data)).set('parentId', leadId);

        default:
            return undefined;
    }
};

const deleteLeadItem = (state: State, meta: Object) => {
    const { previousAction: {
        payload: { leadId, group, itemId },
    } } = (meta: Object);
    const items: any = state.getIn(['entities', leadId.toString(), group]);
    if (items.size !== 0) {
        const newItems = items.filter((item: any) =>
            item.id.toString() !== itemId.toString());
        // TODO: Fix the state update for notes.
        return state.setIn(['entities', leadId.toString(), group], newItems);
    }
    return state;
};

const updateLeadItem = (state: State, meta: Object, payload: Object) => {
    const { leadId, group } = (meta: Object);
    const { data } = (payload: Object);
    const newItem = getNewItem(data, leadId, group);
    return state;
};

export default (state: State = initialState, action: Action) => {
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
            return state.setIn(['entities', leadToSet.id],
                generateLeadRecord(leadToSet));

        case LEAD_DELETE_SUCCESS:
            const { id } = (action: Object);
            return state.deleteIn(['entities', id]);

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data } } = (action: Object);
            return mergeEntities(state, data);

        case LEAD_ITEM_CREATE_SUCCESS:
        case LEAD_ITEM_UPDATE_SUCCESS:
            const {
                meta: metaForUpdate,
                payload: payloadForUpdate,
            } = (action: Object);
            return updateLeadItem(state, metaForUpdate, payloadForUpdate);

        case LEAD_ITEM_DELETE_SUCCESS:
            const {
                meta: metaForDelete,
            } = (action: Object);
            return deleteLeadItem(state, metaForDelete);

        default:
            return state;
    }
};
