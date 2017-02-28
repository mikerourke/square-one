/* @flow */

/* External dependencies */
import { schema } from 'normalizr';
import { Record, List } from 'immutable';

/* Types */
import type { Selection } from 'lib/types';

const setting = new schema.Entity('settings', {}, {
    idAttribute: 'settingName',
});
export const settingSchema = [setting];

export default class Setting extends Record({
    id: (0: number),
    category: ('': string),
    settingName: ('': string),
    data: (null: ?string | ?List<Selection>),
}) {
    /**
     * Converts the data associated with the specified Setting to an Array (for
     *      a list) or an Object.
     * @returns {Array | Object} Data in JavaScript format.
     */
    getData(): Object | Array<*> {
        const settingData = this.data;
        if (List.isList(settingData)) {
            return settingData.toArray();
        }
        return settingData.toJS();
    }
}
