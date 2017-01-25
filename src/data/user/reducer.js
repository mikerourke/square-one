import {
    GET_USER, GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL,
} from './actionTypes';
import { User } from './model';

const initialState = new User();

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return state;

        case GET_USER_INFO_SUCCESS:
            // TODO: Determine how to handle getting user information.
            return state;

        case LOGIN_SUCCESS:
            return state.merge({
                id: action.payload.data.id,
                username: action.payload.data.username,
                password: action.payload.data.password,
                error: null,
                token: null,
            });

        case LOGIN_FAIL:
            return state.set('error', null);

        default:
            return state;
    }
};

export default user;
