/* @flow */

/* External dependencies */
import {
    fromJS,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    USER_GET_ALL_SUCCESS, USER_GET_ALL_FAIL,
    USER_GET_SINGLE_SUCCESS, USER_GET_SINGLE_FAIL,
} from '../../action-types';
import User from './model';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, User>;
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
    const { entities: { users } } = (data: Object);
    return state.merge({
        byId: OrderedMap([...Object.entries(users).map(
            ([key, value]) => ([key, new User(fromJS(value))]))]),
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case USER_GET_ALL_FAIL:
        case USER_GET_SINGLE_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case USER_GET_ALL_SUCCESS:
            const { payload: { data: responseData } } = (action: Object);
            return mergeEntities(state, responseData);

        case USER_GET_SINGLE_SUCCESS:
            const { payload: { data: existingUser } } = (action: Object);
            return state.setIn(['byId', existingUser.id],
                new User(fromJS(existingUser)));

        default:
            return state;
    }
};
