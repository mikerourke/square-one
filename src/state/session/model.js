/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Session extends Record({
  id: (0: number),
  username: ('': string),
  fullName: ('': string),
  title: ('': string),
  role: ('': string),
  isAuthenticated: (false: boolean),
  error: (null: ?any),
}) {}
