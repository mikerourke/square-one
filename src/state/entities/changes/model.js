/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Change extends Record({
    parentId: (0: number),
    id: (0: number),
    changeType: ('': string),
    iconName: ('': string),
    title: ('': string),
    details: ('': string),
    createdBy: ('': string),
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
    typeName: ('change': string),
}) {}
