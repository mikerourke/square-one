/* @flow */

/* External dependencies */
import {
    fromJS,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    MESSAGE_CREATE_SUCCESS, MESSAGE_CREATE_FAIL,
    MESSAGE_DELETE_SUCCESS, MESSAGE_DELETE_FAIL,
    MESSAGE_UPDATE_SUCCESS, MESSAGE_UPDATE_FAIL,
    LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
} from '../../action-types';
import Message from './model';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, Message>;
type ErrorMap = Map<string, any>;
type State = Map<string, ByIdMap | ErrorMap>;

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
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case LEAD_GET_ALL_FAIL:
        case MESSAGE_CREATE_FAIL:
        case MESSAGE_DELETE_FAIL:
        case MESSAGE_UPDATE_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: entities } } = (action: Object);
            return mergeEntities(state, entities);

        case MESSAGE_CREATE_SUCCESS:
        case MESSAGE_UPDATE_SUCCESS:
            const { payload: { data: newMessage } } = (action: Object);
            return state.setIn(['byId', newMessage.id.toString()],
                new Message(fromJS(newMessage)));

        case MESSAGE_DELETE_SUCCESS:
            const { payload: { data: { id } } } = (action: Object);
            return state.deleteIn(['byId', id.toString()]);

        default:
            return state;
    }
};
