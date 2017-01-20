import { schema } from 'normalizr';

const lead = new schema.Entity('leads');
export const leadSchema = [ lead ];

const list = new schema.Entity('lists');
const item = new schema.Entity('items', {
    listName: list,
});
export const listItemSchema = [ list ];
