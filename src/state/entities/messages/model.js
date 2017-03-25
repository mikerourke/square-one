/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Message extends Record({
    id: (0: number),
    messageType: ('': string),
    recipient: ('': string),
    subject: ('': string),
    body: ('': string),
    createdBy: ('': string),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
    typeName: ('message': string),
}) {}
