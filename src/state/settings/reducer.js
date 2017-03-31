/* @flow */

/* External dependencies */
import {
    fromJS,
    List,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    SETTING_GET_ALL_SUCCESS, SETTING_GET_ALL_FAIL,
    SETTING_GET_SINGLE_SUCCESS, SETTING_GET_SINGLE_FAIL,
    SETTING_UPDATE_SUCCESS, SETTING_UPDATE_FAIL,
} from '../action-types';
import Setting from './model';

/* Types */
import type { Action } from 'lib/types';

type ByNameMap = Map<string, Setting>;
type AllNamesList = List<string>;
type ErrorMap = Map<string, any>;
type State = Map<string, ByNameMap | AllNamesList | ErrorMap>;

const initialState = OrderedMap();

const mergeEntities = (state: State, data: Object): State => {
    const { entities: { settings }, result } = (data: Object);
    return state.merge({
        byName: OrderedMap([...Object.entries(settings).map(
            ([key, value]) => ([key, new Setting(fromJS(value))]))]),
        allNames: new List(result),
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case SETTING_GET_ALL_FAIL:
        case SETTING_GET_SINGLE_FAIL:
        case SETTING_UPDATE_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case SETTING_GET_SINGLE_SUCCESS:
        case SETTING_UPDATE_SUCCESS:
            const { payload: { data: setting } } = (action: Object);
            return state.setIn(['byName', setting.settingName],
                new Setting(fromJS(setting)));

        case SETTING_GET_ALL_SUCCESS:
            const { payload: { data: responseData } } = (action: Object);
            return mergeEntities(state, responseData);

        default:
            return state;
    }
};
