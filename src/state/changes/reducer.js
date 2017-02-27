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
    const data: Object = { payload: { action } };
    switch (action.type) {
        case CHANGE_CREATE_SUCCESS:
        case CHANGE_GET_SINGLE_SUCCESS:
        case CHANGE_UPDATE_SUCCESS:
            return state.set(data.id, new Change(fromJS(data)));


        case CHANGE_GET_ALL_SUCCESS:
            return mergeEntities(state, fromJS(data.entities.changes));

        default:
            return state;
    }
};
