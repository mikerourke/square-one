/* @flow */

/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';

/* Internal dependencies */
import {
    SETTING_GET_SINGLE, SETTING_GET_SINGLE_SUCCESS, SETTING_GET_SINGLE_FAIL,
    SETTING_GET_ALL, SETTING_GET_ALL_SUCCESS, SETTING_GET_ALL_FAIL,
    SETTING_UPDATE, SETTING_UPDATE_SUCCESS, SETTING_UPDATE_FAIL,
} from '../action-types';
import Setting from './model';

/* Types */
import type { Action } from 'lib/types';
import type { Map } from 'immutable';

type State = Map<number, Setting>;

const initialState = OrderedMap();

const mergeEntities = (state: State, newSettings: Array<Setting>): State =>
    state.merge(newSettings.map(setting => new Setting(setting)));

export default (state: State = initialState, action: Action) => {
    const { payload } = (action: Object);
    switch (action.type) {
        case SETTING_GET_SINGLE_SUCCESS:
            const { data: setting } = (payload: Object);
            return state.set(setting.id, new Setting(setting));

        case SETTING_GET_ALL_FAIL:
            return console.log('Error!');

        case SETTING_GET_ALL_SUCCESS:
            const { data: {
                entities: {
                    settings = [],
                } = {},
            } } = (payload: Object);
            return mergeEntities(state, fromJS(settings));

        default:
            return state;
    }
};
