/* @flow */

/* External dependencies */
import { fromJS } from 'immutable';

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

const session = (
    state: State = initialState,
    action: Action,
) => {
    switch (action.type) {
        case SESSION_LOGIN_FAIL:
        case SESSION_LOGOUT_FAIL:
            const { payload: error } = (action: Object);
            return state.set('error', fromJS(error));

        case SESSION_LOGIN_SUCCESS:
            const { payload: loginSession } = (action: Object);
            const validSession = Object.assign({}, loginSession, {
                isAuthenticated: true,
            });
            return state.merge(new Session(fromJS(validSession)));

        case SESSION_LOGOUT_SUCCESS:
            const { payload: logoutSession } = (action: Object);
            return state.merge(new Session(fromJS(logoutSession)));

        default:
            return state;
    }
};

export default session;
