/* @flow */

/* External dependencies */
import { Record, List } from 'immutable';

export default class Setting extends Record({
    id: (0: number),
    category: ('': string),
    settingName: ('': string),
    data: (null: ?string | ?List<string>),
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
