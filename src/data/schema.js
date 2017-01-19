import { schema } from 'normalizr';

const leadSchema = new schema.Entity('leads');
export const leadListSchema = [ leadSchema ];
