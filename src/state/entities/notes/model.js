/* @flow */

/* External dependencies */
import { Record } from 'immutable';

/* Types */
import type { RecordDiff } from 'lib/types';

export default class Note extends Record({
    id: (0: number),
    contents: ('': string),
    isPrivate: (false: boolean),
    createdBy: (new Map(): Map<string, any>),
    createdAt: (null: ?Date),
    updatedBy: (new Map(): Map<string, any>),
    updatedAt: (null: ?Date),
    typeName: ('note': string),
}) {}
