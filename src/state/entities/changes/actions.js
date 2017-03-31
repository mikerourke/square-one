/* @flow */

/* Internal dependencies */
import { CHANGES_CREATE } from '../../action-types';
import { Change, Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const createChanges = (parent: Parent,
    changes: Array<Change>): Action => ({
        type: CHANGES_CREATE,
        payload: {
            request: {
                method: 'post',
                url: `/${parent.typeName}s/${parent.id}/changes`,
                data: changes.map(change => change.toJS()),
            },
        },
    });
