/* @flow */

// TODO: Add authorization and password handling.

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

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case SESSION_LOGIN_FAIL:
        case SESSION_LOGOUT_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case SESSION_LOGIN_SUCCESS:
        case SESSION_LOGOUT_SUCCESS:
            const { payload: { data: session } } = (action: Object);
            return state.merge(new Session(fromJS(session)));

        default:
            return state;
    }
};
