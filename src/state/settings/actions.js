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
import { settingSchema } from './model';

import type { Action } from 'lib/types';

const BASE_URL = '/settings';

export const getSetting = (settingName: string): Action => ({
    type: SETTING_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${settingName}`,
        },
    },
});

export const getAllSettings = (): Action => ({
    type: SETTING_GET_ALL,
    payload: {
        request: {
            method: 'get',
            url: BASE_URL,
            transformResponse:
                axios.defaults.transformResponse.concat((data) => {
                    if (data) {
                        return normalize(data, settingSchema);
                    }
                    return {};
                }),
        },
    },
});
