/* @flow */

/* External dependencies */
import axios from 'axios';
import { browserHistory } from 'react-router';

/* Internal dependencies */
import {
    SESSION_LOGIN, SESSION_LOGIN_FAIL, SESSION_LOGIN_SUCCESS,
    SESSION_LOGOUT, SESSION_LOGOUT_FAIL, SESSION_LOGOUT_SUCCESS,
    SESSION_FORGOT_PWD, SESSION_FORGOT_PWD_FAIL, SESSION_FORGOT_PWD_SUCCESS,
    SESSION_RESET_PWD, SESSION_RESET_PWD_FAIL, SESSION_RESET_PWD_SUCCESS,
} from '../action-types';

const apiUrl = process.env.API_URL || 'http://localhost:8080/api';

export const login = (
    username: string,
    password: string,
) => (dispatch: Function) =>
    new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/auth/login`, { username, password })
            .then((response) => {
                localStorage.setItem('jwt', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
                dispatch({
                    type: SESSION_LOGIN_SUCCESS,
                    payload: response.data.user,
                });
                resolve();
            })
            .catch((error) => {
                dispatch({
                    type: SESSION_LOGIN_FAIL,
                    payload: error,
                });
                reject();
            });
    });

export const logout = (username: string) =>
    (dispatch: Function) =>
        new Promise((resolve, reject) => {
            axios.post(`${apiUrl}/auth/logout`, { username })
                .then((response) => {
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('userId');
                    dispatch({
                        type: SESSION_LOGOUT_SUCCESS,
                        payload: response.data.user,
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: SESSION_LOGOUT_FAIL,
                        payload: error,
                    });
                    reject();
                });
        });

export const getForgotPasswordToken = (username: string) =>
    (dispatch: Function) => {
        axios.post(`${apiUrl}/auth/forgot-password`, { username })
            .then((response) => {
                dispatch({
                    type: SESSION_FORGOT_PWD_SUCCESS,
                    payload: response.data.message,
                });
                browserHistory.push('/login');
            })
            .catch(error => dispatch({
                type: SESSION_FORGOT_PWD_FAIL,
                payload: error,
            }));
    };

export const resetPassword = (
    token: string,
    password: string,
) => (dispatch: Function) => {
    axios.post(`${apiUrl}/auth/reset-password/${token}`, { password })
        .then((response) => {
            dispatch({
                type: SESSION_RESET_PWD_SUCCESS,
                payload: response.data.message,
            });
        })
        .catch(error => dispatch({
            type: SESSION_RESET_PWD_FAIL,
            payload: error,
        }));
};
