/*
 * External dependencies
 */
import { OrderedMap, fromJS } from 'immutable';

/*
 * Internal dependencies
 */
import {
    SETTING_GET_SINGLE, SETTING_GET_SINGLE_SUCCESS, SETTING_GET_SINGLE_FAIL,
    SETTING_GET_ALL, SETTING_GET_ALL_SUCCESS, SETTING_GET_ALL_FAIL,
    SETTING_UPDATE, SETTING_UPDATE_SUCCESS, SETTING_UPDATE_FAIL,
} from '../action-types';
import Setting from './model';

const initialState = OrderedMap();

const mergeEntities = (state, newSettings) =>
    state.merge(newSettings.map(setting => new Setting(setting)));

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SETTING_GET_SINGLE_SUCCESS:
            const { data } = payload;
            return state.set(data.id, new Setting(data));

        case SETTING_GET_ALL_SUCCESS:
            const { settings } = payload.data.entities;
            return mergeEntities(state, fromJS(settings));

        default:
            return state;
    }
};
