import {
    GET_USER,
    GET_USER_INFO,
    LOGIN,
    LOGOUT,
} from './actionTypes';

export function getUser(value) {
    return {
        type: GET_USER,
        payload: value
    };
}

export function getUserInfo(user) {
    return {
        type: GET_USER_INFO,
        payload: {
            request: {
                type: 'get',
                url: `/users/${user.id}`,
            }
        }
    };
}

export function auth(username, password) {
    return {
        type: LOGIN,
        payload: {
            request: {
                type: 'get',
                url: `/users/${username}`,
            }
        }
    };
}

export function logout(user) {
    return {
        type: LOGOUT,
        payload: {
            request: {
                type: 'get',
                url: `/users/${user.id}`,
            }
        }
    }
}
