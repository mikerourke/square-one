/* @flow */

/* External dependencies */
import { schema } from 'normalizr';
import { Record, List } from 'immutable';

const setting = new schema.Entity('settings', {}, {
    idAttribute: 'settingName',
});
export const settingSchema = [setting];

export default class Setting extends Record({
    id: (0: number),
    category: ('': string),
    settingName: ('': string),
    data: (null: ?string | ?Array<any>),
}) {
    getData() {
        const settingData = this.data;
        if (List.isList(settingData)) {
            return settingData.toArray().map(dataItem => dataItem.toJS());
        }
        return settingData.toJS();
    }
}
