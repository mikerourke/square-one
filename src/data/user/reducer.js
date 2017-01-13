import {
    GET_USER, GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL,
} from './actionTypes';

const initialState = {
    username: '',
    password: '',
};

const user = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER:
            return state;

        case GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                info: action.payload.data
            });

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                token: null,
                username: action.payload.data.username,
                password: action.payload.data.password,
            });

        case LOGIN_FAIL:
            return Object.assign({}, state, {
                error: action
            });

        default:
            return state;
    }
}

export default user;
