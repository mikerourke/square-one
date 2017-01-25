import { Record, List } from 'immutable';

export default class Setting extends Record({
    id: null,
    category: '',
    settingName: '',
    data: undefined,
}) {
    getData() {
        const settingData = this.data;
        if (List.isList(settingData)) {
            return settingData.toArray().map(dataItem => dataItem.get('value'));
        }
        return settingData.toJS();
    }
}
