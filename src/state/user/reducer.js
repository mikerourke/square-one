/* @flow */

/* Internal dependencies */
import {
    USER_GET, USER_GET_INFO, USER_GET_INFO_SUCCESS, USER_GET_INFO_FAIL,
    USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL,
} from '../action-types';
import User from './model';

const initialState = new User();

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_GET:
            return state;

        case USER_GET_INFO_SUCCESS:
            // TODO: Determine how to handle getting user information.
            return state;

        case USER_LOGIN_SUCCESS:
            const { data } = payload;
            return state.merge({
                id: data.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                title: data.title,
                isLoggedIn: data.isLoggedIn,
                error: null,
                token: null,
            });

        case USER_LOGIN_FAIL:
            return state.set('error', null);

        default:
            return state;
    }
};
