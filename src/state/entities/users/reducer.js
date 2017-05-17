/* @flow */

/* External dependencies */
import {
  fromJS,
  OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
  USER_GET_ALL_SUCCESS, USER_GET_ALL_FAIL,
  USER_GET_SINGLE_SUCCESS, USER_GET_SINGLE_FAIL,
} from '../../action-types';
import User from './model';
import { mergeEntitiesIntoState } from '../state';

/* Types */
import type { Action, EntityState } from 'lib/types';

const initialState = OrderedMap();

export default function reducer(
  state: EntityState = initialState,
  action: Action,
) {
  switch (action.type) {
    case USER_GET_ALL_FAIL:
    case USER_GET_SINGLE_FAIL:
      const { error: { response } } = (action: Object);
      return state.set('error', fromJS(response));

    case USER_GET_ALL_SUCCESS:
      const { payload: { data: responseData } } = (action: Object);
      return mergeEntitiesIntoState(state, responseData, 'User');

    case USER_GET_SINGLE_SUCCESS:
      const { payload: { data: existingUser } } = (action: Object);
      return state.setIn(['byId', +existingUser.id],
        new User(fromJS(existingUser)));

    default:
      return state;
  }
}
