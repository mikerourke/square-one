/* @flow */

/* External dependencies */
import {
  fromJS,
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
import { getIdFromPayload } from 'lib/api';
import { mergeEntitiesIntoState } from '../state';

/* Types */
import type { Action, EntityState } from 'lib/types';

const initialState = OrderedMap();

export default function reducer(
  state: EntityState = initialState,
  action: Action,
) {
  switch (action.type) {
    case LEAD_GET_ALL_FAIL:
    case NOTE_CREATE_FAIL:
    case NOTE_DELETE_FAIL:
    case NOTE_UPDATE_FAIL:
      const { error: { response } } = (action: Object);
      return state.set('error', fromJS(response));

    case LEAD_GET_ALL_SUCCESS:
      const { payload: { data: responseData } } = (action: Object);
      return mergeEntitiesIntoState(state, responseData, 'Note');

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
}
