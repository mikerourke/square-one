/* @flow */

/* External dependencies */
import axios from 'axios';
import { normalize } from 'normalizr';

/* Internal dependencies */
import {
    SETTING_GET_SINGLE,
    SETTING_GET_ALL,
    SETTING_UPDATE,
} from '../action-types';
import Setting from './model';
import settingsSchema from './schema';

import type { Action } from 'lib/types';

const BASE_URL = '/settings';

const transformForMany = axios.defaults.transformResponse.concat((data) => {
    if (data) {
        return normalize(data, settingsSchema);
    }
    return {};
});

export const getAllSettings = (): Action => ({
    type: SETTING_GET_ALL,
    payload: {
        request: {
            method: 'get',
            url: BASE_URL,
            transformResponse: transformForMany,
        },
    },
});

export const getSetting = (settingName: string): Action => ({
    type: SETTING_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${settingName}`,
        },
    },
});

export const updateSetting = (setting: Setting): Action => ({
    type: SETTING_UPDATE,
    payload: {
        request: {
            method: 'patch',
            url: `${BASE_URL}/${setting.id}`,
            data: setting.toJS(),
        },
    },
});
