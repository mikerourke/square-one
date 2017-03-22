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

const getEntitiesAsMap = (entities: Object) => {
    const { changes, leads, messages, notes } = entities;
    return new Map({
        changes: OrderedMap([...Object.entries(changes).map(
            ([key, value]) => ([key, new Change(fromJS(value))]),
        )]),
        leads: OrderedMap([...Object.entries(leads).map(
            ([key, value]) => ([key, new Lead(fromJS(value))]),
        )]),
        messages: OrderedMap([...Object.entries(messages).map(
            ([key, value]) => ([key, new Message(fromJS(value))]),
        )]),
        notes: OrderedMap([...Object.entries(notes).map(
            ([key, value]) => ([key, new Note(fromJS(value))]),
        )]),
    });
};

/**
 * Returns the new state with updated entity data and any error details.
 * @param {State} state Existing Redux state.
 * @param {Object} data Data from the API return call.
 * @returns {State} Updated state with new data.
 */
const mergeEntities = (state: State, data: Object): State => {
    const { entities, result } = (data: Object);
    return state.merge({
        entities: getEntitiesAsMap(entities),
        result: new List(result),
        error: new Map(),
    });
};

const deleteLeadItem = (state: State, meta: Object) => {
    const { previousAction: {
        payload: { leadId, group, itemId },
    } } = (meta: Object);
    return state.setIn(['entities', group],
        state.getIn(['entities', group])
            .filter(groupItem => groupItem.id.toString() !== itemId.toString()),
    );
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
            return state.setIn(['entities', 'leads', leadToSet.id],
                fromJS(leadToSet));

        case LEAD_DELETE_SUCCESS:
            const { id } = (action: Object);
            return state.deleteIn(['entities', id]);

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: entities } } = (action: Object);
            return mergeEntities(state, entities);

        case LEAD_ITEM_CREATE_SUCCESS:
            return state;

        case LEAD_ITEM_DELETE_SUCCESS:
            const {
                meta: metaForDelete,
            } = (action: Object);
            return deleteLeadItem(state, metaForDelete);

        default:
            return state;
    }
};
