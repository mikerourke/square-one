/* @flow */

/* External dependencies */
import { List, Record } from 'immutable';

/* Internal dependencies */
import { Change, Message, Note } from '../models';

export default class Lead extends Record({
    id: (0: number),
    leadName: ('': string),
    contactName: ('': string),
    source: ('': string),
    leadFee: (0: number),
    phone: ('': string),
    email: ('': string),
    address: ('': string),
    lat: (0: number),
    lng: (0: number),
    description: ('': string),
    status: ('New': string),
    assignTo: ('': string),
    changes: (new List(): List<Change>),
    messages: (new List(): List<Message>),
    notes: (new List(): List<Note>),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
}) {}
