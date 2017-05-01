/* @flow */

/* External dependencies */
import { Record } from 'immutable';

export default class Note extends Record({
    id: (0: number),
    contents: ('': string),
    isPrivate: (false: boolean),
    createdBy: (new Map(): Map<string, any>),
    createdAt: (null: ?Date),
    updatedBy: (new Map(): Map<string, any>),
    updatedAt: (null: ?Date),
    typeName: ('note': string),
}) {
    // TODO: Fix the created by and updated by fields.
    getEntityForApiCall() {
        const noteObject = this.toJS();
        return {
            id: noteObject.id,
            contents: noteObject.contents,
            createdBy: 1,
            updatedBy: 1,
        };
    }
}
