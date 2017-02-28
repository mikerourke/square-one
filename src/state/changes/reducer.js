/* @flow */

/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';

/* Internal dependencies */
import {
    CHANGE_CREATE, CHANGE_CREATE_SUCCESS, CHANGE_CREATE_FAIL,
    CHANGE_DELETE, CHANGE_DELETE_SUCCESS, CHANGE_DELETE_FAIL,
    CHANGE_GET_ALL, CHANGE_GET_ALL_SUCCESS, CHANGE_GET_ALL_FAIL,
    CHANGE_GET_SINGLE, CHANGE_GET_SINGLE_SUCCESS, CHANGE_GET_SINGLE_FAIL,
    CHANGE_UPDATE, CHANGE_UPDATE_SUCCESS, CHANGE_UPDATE_FAIL,
} from '../action-types';
import Change from './model';

/* Types */
import type { Action } from 'lib/types';
import type { Map } from 'immutable';

type State = Map<number, Change>;

const initialState = OrderedMap();

const mergeEntities = (state: State, newChanges: Array<Change>): State =>
    state.merge(newChanges.map(change => new Change(change)));

export default (state: State = initialState, action: Action) => {
    const { payload } = (action: Object);
    switch (action.type) {
        case CHANGE_CREATE_SUCCESS:
        case CHANGE_GET_SINGLE_SUCCESS:
        case CHANGE_UPDATE_SUCCESS:
            const { data: change } = (payload: Object);
            return state.set(change.id, new Change(fromJS(change)));


        case CHANGE_GET_ALL_SUCCESS:
            const { data: {
                entities: {
                    changes = [],
                } = {},
            } } = (payload: Object);
            return mergeEntities(state, fromJS(changes));

        default:
            return state;
    }
};
