import { Record } from 'immutable';

export default class User extends Record({
    id: null,
    username: '',
    password: '',
    error: null,
    token: null,
}) {
    authenticate() {
        // TODO: Write authentication procedure.
    }
}
