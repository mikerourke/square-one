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
    NOTE_CREATE_SUCCESS, NOTE_CREATE_FAIL,
    NOTE_DELETE_SUCCESS, NOTE_DELETE_FAIL,
    NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL,
    LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
} from '../../action-types';
import Note from './model';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, Note>;
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
    const { entities: { notes } } = (data: Object);
    return state.merge({
        byId: OrderedMap([...Object.entries(notes).map(
            ([key, value]) => ([key, new Note(fromJS(value))]))]),
        allIds: new List(Object.keys(notes).map(key => parseInt(key, 10))),
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case NOTE_CREATE_SUCCESS:
        case NOTE_UPDATE_SUCCESS:
            return state;

        case NOTE_DELETE_SUCCESS:
            console.log(action);
            return state;

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: entities } } = (action: Object);
            return mergeEntities(state, entities);

        default:
            return state;
    }
};
