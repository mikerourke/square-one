import { Record, Map } from 'immutable';

export const Setting = new Record({
    id: null,
    category: '',
    settingName: '',
    isDataArray: false,
    data: new Map(),
});
