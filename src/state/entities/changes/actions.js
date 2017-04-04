/* @flow */

/* Internal dependencies */
import { CHANGES_LOG } from '../../action-types';
import { Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const logChanges = (
    parent: Parent,
    changes: Array<Object>,
): Action => ({
    type: CHANGES_LOG,
    payload: {
        request: {
            method: 'post',
            url: `/${parent.typeName}s/${parent.id}/changes`,
            data: changes,
        },
    },
});
