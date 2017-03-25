/* @flow */

/* Internal dependencies */
import {
    MESSAGE_CREATE,
    MESSAGE_DELETE,
    MESSAGE_UPDATE,
} from '../../action-types';
import { Message, Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const createMessage = (parent: Parent, message: Message): Action => ({
    type: MESSAGE_CREATE,
    payload: {
        request: {
            method: 'post',
            url: `${parent.typeName}s/${parent.id}/messages`,
            data: message.toJS(),
        },
    },
});

export const deleteMessage = (parent: Parent, id: number): Action => ({
    type: MESSAGE_DELETE,
    payload: {
        request: {
            method: 'delete',
            url: `${parent.typeName}s/${parent.id}/messages/${id}`,
        },
    },
});

export const updateMessage = (parent: Parent, message: Message): Action => ({
    type: MESSAGE_UPDATE,
    payload: {
        request: {
            method: 'patch',
            url: `${parent.typeName}s/${parent.id}/messages/${message.id}`,
            data: message.toJS(),
        },
    },
});
