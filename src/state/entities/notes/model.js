/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Note extends Record({
    parentId: (0: number),
    id: (0: number),
    title: ('': string),
    details: ('': string),
    isPrivate: (false: boolean),
    createdBy: ('': string),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
}) {}
