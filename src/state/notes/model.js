/* @flow */

/* External dependencies */
import { schema } from 'normalizr';
import { Record } from 'immutable';

/* Internal dependencies */
const noteEntity = new schema.Entity('notes');
export const noteSchema = [noteEntity];

export default class Note extends Record({
    id: (0: number),
    entityType: ('': string),
    entityId: (0: number),
    title: ('': string),
    details: ('': string),
    isPrivate: (false: boolean),
    createdBy: ('': string),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
}) {
    // Placeholder for extension methods.
}
