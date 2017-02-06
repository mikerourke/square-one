import {
    GET_SETTING,
    GET_ALL_SETTINGS,
    UPDATE_SETTING,
} from './actionTypes';
import { settingSchema } from './model';
import { normalize } from 'normalizr';
import axios from 'axios';

const defaultTransform = axios.defaults.transformResponse;

const BASE_URL = '/settings';

export const getSetting = settingName => ({
    type: GET_SETTING,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${settingName}`,
        },
    },
});

export const getAllSettings = () => ({
    type: GET_ALL_SETTINGS,
    payload: {
        request: {
            method: 'get',
            url: BASE_URL,
            transformResponse: defaultTransform.concat(data =>
                normalize(data, settingSchema)),
        },
    },
});
