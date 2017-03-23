/* @flow */

/* External dependencies */
import { schema } from 'normalizr';

const childProcessStrategy = (value, parent) => Object.assign({},
    { parentId: parent.id }, value);

const changeSchema = new schema.Entity('changes', {}, {
    processStrategy: childProcessStrategy,
});

const messageSchema = new schema.Entity('messages', {}, {
    processStrategy: childProcessStrategy,
});

const noteSchema = new schema.Entity('notes', {}, {
    processStrategy: childProcessStrategy,
});

/**
 * Schema entity for a Lead with child entities.
 */
export const leadSchema = new schema.Entity('leads', {
    changes: [changeSchema],
    messages: [messageSchema],
    notes: [noteSchema],
});

export const leadsSchema = [leadSchema];
