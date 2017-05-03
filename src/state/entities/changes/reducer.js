/* @flow */

/* External dependencies */
import {
    fromJS,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    CHANGES_GET_FOR_PARENT_SUCCESS, CHANGES_GET_FOR_PARENT_FAIL,
    LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
} from '../../action-types';
import Change from './model';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, Change>;
type ErrorMap = Map<string, any>;
type State = Map<string, ByIdMap, ErrorMap>;

const initialState = OrderedMap();

/**
 * Returns the new state with updated entity data and any error details.
 * @param {State} state Existing Redux state.
 * @param {Object} data Data from the API return call.
 * @returns {State} Updated state with new data.
 */
const mergeEntities = (state: State, data: Object): State => {
    const { entities: { changes } } = (data: Object);
    let byIdOrderedMap = OrderedMap();
    if (changes) {
        const changeEntries = Object.entries(changes);
        byIdOrderedMap = OrderedMap([...changeEntries.map(
            ([key, value]) => ([+key, new Change(fromJS(value))]))]);
    }
    return state.merge({
        byId: byIdOrderedMap,
        error: new Map(),
    });
};

const changesReducer = (
    state: State = initialState,
    action: Action,
) => {
    switch (action.type) {
        case LEAD_GET_ALL_FAIL:
        case CHANGES_GET_FOR_PARENT_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: responseData } } = (action: Object);
            return mergeEntities(state, responseData);

        // TODO: Finish this for getting changes.
        case CHANGES_GET_FOR_PARENT_SUCCESS:
            const { payload: { data: changesInParent } } = (action: Object);
            return state;

        default:
            return state;
    }
};

export default changesReducer;
