/* @flow */

/* External dependencies */
import {
    fromJS,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    SETTING_GET_ALL, SETTING_GET_ALL_SUCCESS, SETTING_GET_ALL_FAIL,
    SETTING_GET_SINGLE, SETTING_GET_SINGLE_SUCCESS, SETTING_GET_SINGLE_FAIL,
    SETTING_UPDATE, SETTING_UPDATE_SUCCESS, SETTING_UPDATE_FAIL,
} from '../action-types';
import Setting from './model';

/* Types */
import type { Action } from 'lib/types';

type EntitiesMap = Map<string, OrderedMap<*>>;
type ErrorMap = Map<string, any>;
type State = Map<string, EntitiesMap | ErrorMap>

const initialState = OrderedMap();

const mergeEntities = (state: State, settings: Map<string, Setting>): State =>
    state.merge({
        entities: settings.map(setting => new Setting(setting)),
        error: new Map(),
    });

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case SETTING_GET_ALL_FAIL:
        case SETTING_GET_SINGLE_FAIL:
        case SETTING_UPDATE_FAIL:
            const { error } = (action: Object);
            return state.set('error', fromJS(error));

        case SETTING_GET_SINGLE_SUCCESS:
        case SETTING_UPDATE_SUCCESS:
            const { payload: { data: setting } } = (action: Object);
            return state.setIn(['entities', setting.id],
                new Setting(fromJS(setting)));

        case SETTING_GET_ALL_SUCCESS:
            const { payload: {
                data: {
                    entities: {
                        settings = [],
                    } = {},
                } } } = (action: Object);
            return mergeEntities(state, fromJS(settings));

        default:
            return state;
    }
};
