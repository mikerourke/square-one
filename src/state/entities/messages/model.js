/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Message extends Record({
    id: (0: number),
    messageType: ('': string),
    recipient: ('': string),
    subject: ('': string),
    body: ('': string),
    createdBy: (new Map(): Map<string, any>),
    createdAt: (null: ?Date),
    updatedBy: (new Map(): Map<string, any>),
    updatedAt: (null: ?Date),
    typeName: ('message': string),
}) {}
