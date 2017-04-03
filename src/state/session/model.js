/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Session extends Record({
    id: (0: number),
    username: ('': string),
    fullName: ('': string),
    title: ('': string),
    isLoggedIn: (false: boolean),
    accessLevel: ('': string),
    error: (null: ?any),
    token: (null: ?any),
}) {
    authenticate() {
        // TODO: Write authentication procedure.
    }
}
