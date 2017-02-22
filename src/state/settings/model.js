/* External dependencies */
import { schema } from 'normalizr';
import { Record, List } from 'immutable';

const setting = new schema.Entity('settings', {}, {
    idAttribute: 'settingName',
});
export const settingSchema = [setting];

export default class Setting extends Record({
    id: null,
    category: '',
    settingName: '',
    data: undefined,
}) {
    getData() {
        const settingData = this.data;
        if (List.isList(settingData)) {
            return settingData.toArray().map(dataItem => dataItem.toJS());
        }
        return settingData.toJS();
    }
}
