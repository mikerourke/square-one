/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Note extends Record({
    id: (0: number),
    contents: ('': string),
    isPrivate: (false: boolean),
    createdBy: ('': string),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
    typeName: ('note': string),
}) {}
