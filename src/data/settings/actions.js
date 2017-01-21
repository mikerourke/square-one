import {
    GET_SETTING,
    GET_ALL_SETTINGS,
    UPDATE_SETTING,
} from './actionTypes';
import { settingSchema } from '../schema';
import { normalize } from 'normalizr';
import axios from 'axios';

const defaultTransform = axios.defaults.transformResponse;

const BASE_URL = '/settings';

export const getSetting = settingName => ({
    type: GET_SETTING,
    payload: {
        request: {
            type: 'get',
            url: `${BASE_URL}/${settingName}`,
        },
    },
});

export const getAllSettings = () => ({
    type: GET_ALL_SETTINGS,
    payload: {
        request: {
            type: 'get',
            url: BASE_URL,
            transformResponse: defaultTransform.concat(data =>
                normalize(data, settingSchema)),
        },
    },
});
