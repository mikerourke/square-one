/* @flow */

/* External dependencies */
import {
    fromJS,
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
import { getIdFromPayload } from 'lib/api-data';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, Note>;
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
    const { entities: { notes } } = (data: Object);
    let byIdOrderedMap = OrderedMap();
    if (notes) {
        const noteEntries = Object.entries(notes);
        byIdOrderedMap = OrderedMap([...noteEntries.map(
            ([key, value]) => ([+key, new Note(fromJS(value))]))]);
    }
    return state.merge({
        byId: byIdOrderedMap,
        error: new Map(),
    });
};

const notes = (
    state: State = initialState,
    action: Action,
) => {
    switch (action.type) {
        case LEAD_GET_ALL_FAIL:
        case NOTE_CREATE_FAIL:
        case NOTE_DELETE_FAIL:
        case NOTE_UPDATE_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: responseData } } = (action: Object);
            return mergeEntities(state, responseData);

        case NOTE_CREATE_SUCCESS:
        case NOTE_UPDATE_SUCCESS:
            const { payload: { data: newNote } } = (action: Object);
            return state.setIn(['byId', +newNote.id],
                new Note(fromJS(newNote)));

        case NOTE_DELETE_SUCCESS:
            const { payload } = (action: Object);
            const noteId = getIdFromPayload(payload, 'note');
            return state.deleteIn(['byId', +noteId]);

        default:
            return state;
    }
};

export default notes;
