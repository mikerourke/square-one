/* @flow */

/* Internal dependencies */
import { MESSAGES_SEND } from '../../action-types';
import { Message, Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const sendMessages = (
    parent: Parent,
    messages: Array<Message>,
): Action => ({
    type: MESSAGES_SEND,
    payload: {
        request: {
            method: 'post',
            url: `/${parent.typeName}s/${parent.id}/messages`,
            data: messages.map(message => message.getEntityForApiCall()),
        },
    },
});
