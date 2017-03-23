/* @flow */

/* Internal dependencies */
import {
    CHANGE_CREATE,
    CHANGE_DELETE,
    CHANGE_UPDATE,
} from '../../action-types';
import { Change, Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const createChange = (parent: Parent, change: Change): Action => ({
    type: CHANGE_CREATE,
    payload: {
        parent,
        request: {
            method: 'post',
            url: `${parent.typeName}s/${parent.id}/changes`,
            data: change.toJS(),
        },
    },
});

export const deleteChange = (parent: Parent, id: number): Action => ({
    type: CHANGE_DELETE,
    payload: {
        id,
        parent,
        request: {
            method: 'delete',
            url: `${parent.typeName}s/${parent.id}/changes/${id}`,
        },
    },
});

export const updateChange = (parent: Parent, change: Change): Action => ({
    type: CHANGE_UPDATE,
    payload: {
        parent,
        request: {
            method: 'patch',
            url: `${parent.typeName}s/${parent.id}/changes/${change.id}`,
            data: change.toJS(),
        },
    },
});
