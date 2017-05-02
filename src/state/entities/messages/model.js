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
}) {
    getEntityForApiCall() {
        const message = this.toJS();
        return {
            id: +message.id,
            messageType: message.messageType,
            recipient: message.recipient,
            subject: message.subject,
            body: message.body,
            createdBy: +localStorage.getItem('userId'),
            updatedBy: +localStorage.getItem('userId'),
        };
    }
}
