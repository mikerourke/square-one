import {
    GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_FAIL,
    GET_ALL_SETTINGS, GET_ALL_SETTINGS_SUCCESS, GET_ALL_SETTINGS_FAIL,
    UPDATE_SETTING, UPDATE_SETTING_SUCCESS, UPDATE_SETTING_FAIL,
} from './actionTypes';
import { OrderedMap, fromJS } from 'immutable';
import Setting from './model';

const initialState = OrderedMap();

const mergeEntities = (state, newSettings) =>
    state.merge(newSettings.map(setting => new Setting(setting)));

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_SETTING_SUCCESS:
            const newSetting = payload.data;
            return state.set(newSetting.id, new Setting(newSetting));

        case GET_ALL_SETTINGS_SUCCESS:
            const { settings } = payload.data.entities;
            return mergeEntities(state, fromJS(settings));

        default:
            return state;
    }
};
