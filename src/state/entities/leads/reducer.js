/* @flow */

/* External dependencies */
import {
  fromJS,
  OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
  LEAD_CREATE_SUCCESS, LEAD_CREATE_FAIL,
  LEAD_DELETE_SUCCESS, LEAD_DELETE_FAIL,
  LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
  LEAD_GET_SINGLE_SUCCESS, LEAD_GET_SINGLE_FAIL,
  LEAD_UPDATE_SUCCESS, LEAD_UPDATE_FAIL,
  MESSAGES_SEND_SUCCESS,
  NOTE_CREATE_SUCCESS, NOTE_DELETE_SUCCESS,
} from '../../action-types';
import Lead from './model';
import { getIdFromPayload, getChildDataFromPayload } from 'lib/api';
import { mergeEntitiesIntoState } from '../state';

/* Types */
import type { Action, EntityState } from 'lib/types';

const initialState = OrderedMap();

export default function reducer(
  state: EntityState = initialState,
  action: Action,
) {
  switch (action.type) {
    case LEAD_CREATE_FAIL:
    case LEAD_DELETE_FAIL:
    case LEAD_GET_ALL_FAIL:
    case LEAD_GET_SINGLE_FAIL:
    case LEAD_UPDATE_FAIL:
      const { error: { response } } = (action: Object);
      return state.set('error', fromJS(response));

    case LEAD_CREATE_SUCCESS:
      const { payload: { data: newLead } } = (action: Object);
      return state.setIn(['byId', +newLead.id],
        new Lead(fromJS(newLead)));

    case LEAD_GET_SINGLE_SUCCESS:
    case LEAD_UPDATE_SUCCESS:
      const { payload: { data: existingLead } } = (action: Object);
      return state.setIn(['byId', +existingLead.id],
        new Lead(fromJS(existingLead)));

    case LEAD_DELETE_SUCCESS:
      const { payload: deletionPayload } = (action: Object);
      const leadId = getIdFromPayload(deletionPayload, 'lead');
      return state.deleteIn(['byId', +leadId]);

    case LEAD_GET_ALL_SUCCESS:
      const { payload: { data: responseData } } = (action: Object);
      return mergeEntitiesIntoState(state, responseData, 'Lead');

    case MESSAGES_SEND_SUCCESS:
      const { payload: messagesPayload } = (action: Object);
      const messages = getChildDataFromPayload(messagesPayload, 'lead');

      // Create an array of the IDs from the messages data pulled from the
      // response payload.
      const idsOfNewMessages = messages.data.map(message => message.id);

      // Concatentate the array of newly created message IDs to the
      // messages list in state.
      const messagesInState = state.getIn(messages.pathInState);
      if (messagesInState) {
        return state.setIn(messages.pathInState,
          messagesInState.concat(idsOfNewMessages));
      }
      return state;

    case NOTE_CREATE_SUCCESS:
      const { payload: createdPayload } = (action: Object);
      const newChild = getChildDataFromPayload(createdPayload, 'lead');

      // Add the ID of the newly created entity to the array of the
      // corresponding group in state.
      const groupInStateForNew = state.getIn(newChild.pathInState);
      if (groupInStateForNew) {
        return state.setIn(newChild.pathInState,
          groupInStateForNew.push(newChild.data.id));
      }
      return state;

    case NOTE_DELETE_SUCCESS:
      const { payload: deletedPayload } = (action: Object);
      const deleteChild = getChildDataFromPayload(deletedPayload, 'lead');

      // Removes the ID of the deleted entity from the array by returning
      // an updated array with the deleted ID filtered out.
      const groupInStateForDelete = state.getIn(deleteChild.pathInState);
      if (groupInStateForDelete) {
        return state.setIn(deleteChild.pathInState,
          groupInStateForDelete.filter(
            childId => +childId !== +deleteChild.childId));
      }
      return state;

    default:
      return state;
  }
}
