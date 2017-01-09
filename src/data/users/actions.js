import {
    GET_USER, GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from './actionTypes';

export function getUser(value) {
    return {
        type: GET_USER,
        payload: value
    };
}

export function getUserInfo(user) {
    console.log('From function getUserInfo');
    return {
        types: [ GET_USER_INFO, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAILURE ],
        promise: client => client.get(`users/${user.username}`)
    };
}

export function auth(username, password) {
    console.log('From function auth');
    return {
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE ],
        promise: client => client.get(`users/${username}`)
    };
}

export function logout(user) {
    return {
        types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE ],
        promise: client => client.get(`users/${user.username}`)
    }
}
