/* @flow */

/* External dependencies */
import axios from 'axios';

/* Internal dependencies */
import {
  SESSION_LOGIN, SESSION_LOGIN_FAIL, SESSION_LOGIN_SUCCESS,
  SESSION_LOGOUT, SESSION_LOGOUT_FAIL, SESSION_LOGOUT_SUCCESS,
  SESSION_FORGOT_PWD, SESSION_FORGOT_PWD_FAIL, SESSION_FORGOT_PWD_SUCCESS,
  SESSION_RESET_PWD, SESSION_RESET_PWD_FAIL, SESSION_RESET_PWD_SUCCESS,
} from '../action-types';

const axiosInstance = axios.create();

/**
 * Sends POST request to the API to get a JWT for authentication. If the
 *    specified username and password is valid, the response of the POST
 *    request contains the JWT and user information, which is stored in
 *    localStorage.
 * @param {string} username Username to get JWT for.
 * @param {string} password Password of the user.
 */
export const login = (
  username: string,
  password: string,
) => (dispatch: Function) => {
  dispatch({ type: SESSION_LOGIN });
  return new Promise((resolve, reject) => {
    axiosInstance.post('/auth/login', { username, password })
      .then((response) => {
        const { data = {} } = response;
        let jwt = '';
        if (data.token) {
          jwt = data.token;
        }
        let userId = 0;
        if (data.user.id) {
          userId = data.user.id;
        }
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('userId', userId.toString());
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
};

/**
 * Sends a POST request to the logout endpoint.  If the request was successful,
 *    the user's authentication details in localStorage are deleted.
 * @param {string} username Username of the user to log out.
 */
export const logout = (username: string) =>
  (dispatch: Function) => {
    dispatch({ type: SESSION_LOGOUT });
    return new Promise((resolve, reject) => {
      axiosInstance.post('/auth/logout', { username })
        .then((response) => {
          localStorage.setItem('jwt', '');
          localStorage.setItem('userId', '');
          dispatch({
            type: SESSION_LOGOUT_SUCCESS,
            payload: response.data.user,
          });
          resolve();
        })
        .catch((error) => {
          dispatch({
            type: SESSION_LOGOUT_FAIL,
            payload: error,
          });
          reject();
        });
    });
  };

// FUTURE: Setup get forgotten password functionality.
export const getForgotPasswordToken = (username: string) =>
  (dispatch: Function) => {
    dispatch({ type: SESSION_FORGOT_PWD });
    return new Promise((resolve, reject) => {
      axiosInstance.post('/auth/forgot-password', { username })
        .then((response) => {
          dispatch({
            type: SESSION_FORGOT_PWD_SUCCESS,
            payload: response.data.message,
          });
          resolve();
        })
        .catch((error) => {
          dispatch({
            type: SESSION_FORGOT_PWD_FAIL,
            payload: error,
          });
          reject();
        });
    });
  };

// FUTURE: Setup password reset functionality.
export const resetPassword = (
  token: string,
  password: string,
) => (dispatch: Function) => {
  dispatch({ type: SESSION_RESET_PWD });
  return new Promise((resolve, reject) => {
    axiosInstance.post(`/auth/reset-password/${token}`, { password })
      .then((response) => {
        dispatch({
          type: SESSION_RESET_PWD_SUCCESS,
          payload: response.data.message,
        });
        resolve();
      })
      .catch((error) => {
        dispatch({
          type: SESSION_RESET_PWD_FAIL,
          payload: error,
        });
        reject();
      });
  });
};
