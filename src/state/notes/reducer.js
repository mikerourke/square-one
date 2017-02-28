/* @flow */

/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';

/* Internal dependencies */
import {
    NOTE_CREATE, NOTE_CREATE_SUCCESS, NOTE_CREATE_FAIL,
    NOTE_DELETE, NOTE_DELETE_SUCCESS, NOTE_DELETE_FAIL,
    NOTE_GET_ALL, NOTE_GET_ALL_SUCCESS, NOTE_GET_ALL_FAIL,
    NOTE_GET_SINGLE, NOTE_GET_SINGLE_SUCCESS, NOTE_GET_SINGLE_FAIL,
    NOTE_UPDATE, NOTE_UPDATE_SUCCESS, NOTE_UPDATE_FAIL,
} from '../action-types';
import Note from './model';

/* Types */
import type { Action } from 'lib/types';
import type { Map } from 'immutable';

type State = Map<number, Note>;

const initialState = OrderedMap();

const mergeEntities = (state: State, newNotes: Array<Note>): State =>
    state.merge(newNotes.map(lead => new Note(lead)));

export default (state: State = initialState, action: Action) => {
    const { payload } = (action: Object);
    switch (action.type) {
        case NOTE_CREATE_SUCCESS:
        case NOTE_GET_SINGLE_SUCCESS:
        case NOTE_UPDATE_SUCCESS:
            const { data: note } = (payload: Object);
            return state.set(note.id, new Note(fromJS(note)));


        case NOTE_GET_ALL_SUCCESS:
            const { data: { entities: { notes } } } = (payload: Object);
            return mergeEntities(state, fromJS(notes));

        default:
            return state;
    }
};
