import {
    GET_USER, GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from './actionTypes';

export default function userReducer(state = {}, action) {
    switch(action.type) {
        case GET_USER:
            return state;

        case GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                info: action.req.data
            });

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                error: null
            });

        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                error: action
            });

        default:
            return state;
    }
}
