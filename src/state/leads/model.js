/* @flow */

/* External dependencies */
import { schema } from 'normalizr';
import { Record } from 'immutable';

/* Internal dependencies */
const leadEntity = new schema.Entity('leads');
export const leadSchema = [leadEntity];

export default class Lead extends Record({
    id: (0: number),
    leadName: ('': string),
    source: ('': string),
    leadFee: (0: number),
    phone: ('': string),
    email: ('': string),
    address: ('': string),
    lat: (0: number),
    lng: (0: number),
    description: ('': string),
    comments: ('': string),
    status: ('': string),
    assignTo: ('': string),
}) {
    // Placeholder for extension methods.
}
