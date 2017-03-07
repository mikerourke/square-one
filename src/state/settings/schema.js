/* @flow */

/* External dependencies */
import { schema } from 'normalizr';

const settingSchema = new schema.Entity('settings', {}, {
    idAttribute: 'settingName',
});
export default [settingSchema];
