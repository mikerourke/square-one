/* @flow */

/* External dependencies */
import { List, Record } from 'immutable';

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
    changes: (new List(): List<number>),
    notes: (new List(): List<number>),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
    editIcon: (null: ?Object),
}) {}
