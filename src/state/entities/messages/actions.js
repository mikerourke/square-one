/* @flow */

/* Internal dependencies */
import { MESSAGE_CREATE } from '../../action-types';
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
