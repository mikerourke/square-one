/* @flow */

/* Internal dependencies */
import { CHANGES_GET_FOR_PARENT } from '../../action-types';
import { Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const getChanges = (parent: Parent): Action => ({
  type: CHANGES_GET_FOR_PARENT,
  payload: {
    request: {
      method: 'get',
      url: `/${parent.typeName}s/${parent.id}/changes`,
    },
  },
});
