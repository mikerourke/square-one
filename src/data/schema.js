import { schema } from 'normalizr';

const lead = new schema.Entity('leads');
export const leadSchema = [lead];

const setting = new schema.Entity('settings', {}, {
    idAttribute: 'settingName',
});
export const settingSchema = [setting];
