/* @flow */

/* Internal dependencies */
import {
    USER_GET, USER_GET_INFO, USER_GET_INFO_SUCCESS, USER_GET_INFO_FAIL,
    USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    USER_LOGOUT, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL,
} from '../action-types';
import User from './model';

/* Types */
import type { Action } from 'lib/types';

type State = User;

const initialState = new User();

export default (state: State = initialState, action: Action) => {
    const { payload } = (action: Object);
    switch (action.type) {
        case USER_GET:
            return state;

        case USER_GET_INFO_SUCCESS:
            // TODO: Determine how to handle getting user information.
            return state;

        case USER_LOGIN_SUCCESS:
            const { data: user } = (payload: Object);
            return state.merge({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                title: user.title,
                isLoggedIn: user.isLoggedIn,
                error: null,
                token: null,
            });

        case USER_LOGIN_FAIL:
            return state.set('error', null);

        default:
            return state;
    }
};
