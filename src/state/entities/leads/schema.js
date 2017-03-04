/* @flow */

/* External dependencies */
import { schema } from 'normalizr';

/**
 * Returns an object containing the fields of the original entity passed in
 *      along with the ID of the parent entity (e.g. if the parent is a Lead,
 *      the field "leadId" will be added to the entity object).
 * @param {Object} child Contains fields associated with the entity.
 * @param {Object} parent Contains fields associated with the parent
 *      entity.
 * @param {string} parentName Name of the parent entity.
 */
const appendParentId = (
    child: Object,
    parent: Object,
    parentName: string,
): Object => {
    const parentIdFieldName = `${parentName}Id`;
    const parentId = { [parentIdFieldName]: parent.id };
    return Object.assign({}, parentId, child);
};

/**
 * Schema entity for Changes within a Lead.
 */
export const change = new schema.Entity('changes', {}, {
    processStrategy: (value, parent) => appendParentId(value, parent, 'lead'),
});

/**
 * Schema entity for Notes within a Lead.
 */
export const note = new schema.Entity('notes', {}, {
    processStrategy: (value, parent) => appendParentId(value, parent, 'lead'),
});

/**
 * Schema entity for a Lead with child Changes and Notes.
 */
const lead = new schema.Entity('leads', {
    changes: [change],
    notes: [note],
});
export const leads = [lead];
