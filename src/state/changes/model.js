/* @flow */

/* External dependencies */
import { schema } from 'normalizr';
import { Record } from 'immutable';

/* Internal dependencies */
const changeEntity = new schema.Entity('changes');
export const changeSchema = [changeEntity];

export default class Change extends Record({
    id: (0: number),
    entityType: ('': string),
    entityId: (0: number),
    changeType: ('': string),
    title: ('': string),
    details: ('': string),
    createdBy: ('': string),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
}) {
    // Placeholder for extension methods.
}
