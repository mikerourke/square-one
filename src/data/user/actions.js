import {
    GET_USER,
    GET_USER_INFO,
    LOGIN,
    LOGOUT,
} from './actionTypes';

export const getUser = value => ({
    type: GET_USER,
    payload: value,
});

export const getUserInfo = user => ({
    type: GET_USER_INFO,
    payload: {
        request: {
            type: 'get',
            url: `/users?username=${user.username}`,
        }
    }
});

export const auth = (username, password) => ({
    type: LOGIN,
    payload: {
        request: {
            type: 'get',
            url: `/users?username=${username}`,
        }
    }
});

export const logout = user => ({
    type: LOGOUT,
    payload: {
        request: {
            type: 'get',
            url: `/users?username=${user.username}`,
        }
    }
});
