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
    case CHANGES_GET_FOR_PARENT_FAIL:
      const { error: { response } } = (action: Object);
      return state.set('error', fromJS(response));

    case LEAD_GET_ALL_SUCCESS:
    case CHANGES_GET_FOR_PARENT_SUCCESS:
      const { payload: { data: responseData } } = (action: Object);
      return mergeEntitiesIntoState(state, responseData, 'Change');

    default:
      return state;
  }
}
