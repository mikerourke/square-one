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
    CHANGE_CREATE, CHANGE_CREATE_SUCCESS, CHANGE_CREATE_FAIL,
    CHANGE_DELETE, CHANGE_DELETE_SUCCESS, CHANGE_DELETE_FAIL,
    CHANGE_UPDATE, CHANGE_UPDATE_SUCCESS, CHANGE_UPDATE_FAIL,
    LEAD_GET_ALL, LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
} from '../../action-types';
import Change from './model';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, Change>;
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
    const { entities: { changes } } = (data: Object);
    return state.merge({
        byId: OrderedMap([...Object.entries(changes).map(
            ([key, value]) => ([key, new Change(fromJS(value))]))]),
        allIds: new List(Object.keys(changes).map(key => parseInt(key, 10))),
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
