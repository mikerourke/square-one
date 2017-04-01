/* @flow */

/* Internal dependencies */
import {
    SESSION_LOGIN_SUCCESS, SESSION_LOGIN_FAIL,
    SESSION_LOGOUT_SUCCESS, SESSION_LOGOUT_FAIL,
} from '../action-types';
import Session from './model';

/* Types */
import type { Action } from 'lib/types';

type State = Session;

const initialState = new Session();

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case SESSION_LOGIN_SUCCESS:
            const { payload: { data: session } } = (action: Object);
            return state.merge({
                id: session.id,
                username: session.username,
                firstName: session.firstName,
                lastName: session.lastName,
                title: session.title,
                isLoggedIn: session.isLoggedIn,
                error: null,
                token: null,
            });

        case SESSION_LOGIN_FAIL:
            return state.set('error', null);

        default:
            return state;
    }
};
