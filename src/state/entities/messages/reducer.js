/* @flow */

/* External dependencies */
import {
  fromJS,
  OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
  MESSAGES_SEND_SUCCESS, MESSAGES_SEND_FAIL,
  LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
} from '../../action-types';
import Message from './model';
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
    case MESSAGES_SEND_FAIL:
      const { error: { response } } = (action: Object);
      return state.set('error', fromJS(response));

    case LEAD_GET_ALL_SUCCESS:
      const { payload: { data: responseData } } = (action: Object);
      return mergeEntitiesIntoState(state, responseData, 'Message');

    case MESSAGES_SEND_SUCCESS:
      const { payload: { data: newMessages } } = (action: Object);
      return state.mergeIn(['byId'], newMessages.map(message =>
        ([+message.id, new Message(fromJS(message))])));

    default:
      return state;
  }
}
