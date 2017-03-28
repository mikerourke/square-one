/* @flow */

/* Internal dependencies */
import { CHANGE_CREATE } from '../../action-types';
import { Change, Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const createChange = (parent: Parent, change: Change): Action => ({
    type: CHANGE_CREATE,
    payload: {
        request: {
            method: 'post',
            url: `/${parent.typeName}s/${parent.id}/changes`,
            data: change.toJS(),
        },
    },
});
