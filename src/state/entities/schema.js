/* @flow */

/* External dependencies */
import { schema } from 'normalizr';

const changeSchema = new schema.Entity('changes');
const messageSchema = new schema.Entity('messages');
const noteSchema = new schema.Entity('notes');

export const leadSchema = new schema.Entity('leads', {
    changes: [changeSchema],
    messages: [messageSchema],
    notes: [noteSchema],
});
export const leadsSchema = [leadSchema];

const userSchema = new schema.Entity('users');
export const usersSchema = [userSchema];
