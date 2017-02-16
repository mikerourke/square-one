/*
 * External dependencies
 */
import { Record } from 'immutable';

export default class User extends Record({
    id: null,
    username: '',
    firstName: '',
    lastName: '',
    title: '',
    isLoggedIn: false,
    error: null,
    token: null,
}) {
    authenticate() {
        // TODO: Write authentication procedure.
    }
}
