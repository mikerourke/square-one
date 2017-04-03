/* @flow */

/* External dependencies */
import {
    fromJS,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    MESSAGES_SEND_SUCCESS, MESSAGES_SEND_FAIL,
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
            ([key, value]) => ([+key, new Message(fromJS(value))]))]),
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case LEAD_GET_ALL_FAIL:
        case MESSAGES_SEND_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: responseData } } = (action: Object);
            return mergeEntities(state, responseData);

        case MESSAGES_SEND_SUCCESS:
            const { payload: { data: newMessages } } = (action: Object);
            return state.mergeIn(['byId'], newMessages.map(message =>
                ([+message.id, new Message(fromJS(message))])));

        default:
            return state;
    }
};
