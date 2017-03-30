/* @flow */

/* Internal dependencies */
import {
    MESSAGE_CREATE_SINGLE,
    MESSAGE_CREATE_MULTIPLE,
} from '../../action-types';
import { Message, Lead } from '../models';

/* Types */
import type { List } from 'immutable';
import type { Action } from 'lib/types';

type Parent = Lead;

export const createSingleMessage = (parent: Parent,
    message: Message): Action => ({
        type: MESSAGE_CREATE_SINGLE,
        payload: {
            request: {
                method: 'post',
                url: `/${parent.typeName}s/${parent.id}/messages`,
                data: message.toJS(),
            },
        },
    });

export const createMultipleMessages = (parent: Parent,
    messages: List<Message>): Action => ({
        type: MESSAGE_CREATE_MULTIPLE,
        payload: {
            request: {
                method: 'post',
                url: `/${parent.typeName}s/${parent.id}/messages`,
                data: messages.toJS(),
            },
        },
    });
