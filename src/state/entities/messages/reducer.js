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
    MESSAGE_CREATE, MESSAGE_CREATE_SUCCESS, MESSAGE_CREATE_FAIL,
    MESSAGE_DELETE, MESSAGE_DELETE_SUCCESS, MESSAGE_DELETE_FAIL,
    MESSAGE_UPDATE, MESSAGE_UPDATE_SUCCESS, MESSAGE_UPDATE_FAIL,
    LEAD_GET_ALL, LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
} from '../../action-types';
import Message from './model';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, Message>;
type AllIdsList = List<number>;
type ErrorMap = Map<string, any>;
type State = Map<string, ByIdMap | AllIdsList | ErrorMap>;

const initialState = OrderedMap();

/**
 * Returns the new state with updated entity data and any error details.
 * @param {State} state Existing Redux state.
 * @param {Object} data Data from the API return call.
 * @returns {State} Updated state with new data.
 */
const mergeEntities = (state: State, data: Object): State => {
    const { entities: { messages } } = (data: Object);
    return state.merge({
        byId: OrderedMap([...Object.entries(messages).map(
            ([key, value]) => ([key, new Message(fromJS(value))]))]),
        allIds: new List(Object.keys(messages).map(key => parseInt(key, 10))),
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: entities } } = (action: Object);
            return mergeEntities(state, entities);

        default:
            return state;
    }
};
