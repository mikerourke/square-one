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
    getEntityForApiCall() {
        const note = this.toJS();
        return {
            id: +note.id,
            contents: note.contents,
            isPrivate: note.isPrivate,
            createdBy: +localStorage.getItem('userId'),
            updatedBy: +localStorage.getItem('userId'),
        };
    }
}
