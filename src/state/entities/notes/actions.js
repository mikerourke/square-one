/* @flow */

/* Internal dependencies */
import {
    NOTE_CREATE,
    NOTE_DELETE,
    NOTE_UPDATE,
} from '../../action-types';
import { Note, Lead } from '../models';

/* Types */
import type { Action } from 'lib/types';

type Parent = Lead;

export const createNote = (parent: Parent, note: Note): Action => ({
    type: NOTE_CREATE,
    payload: {
        parent,
        request: {
            method: 'post',
            url: `${parent.typeName}s/${parent.id}/notes`,
            data: note.toJS(),
        },
    },
});

export const deleteNote = (parent: Parent, id: number): Action => ({
    type: NOTE_DELETE,
    payload: {
        id,
        parent,
        request: {
            method: 'delete',
            url: `${parent.typeName}s/${parent.id}/notes/${id}`,
        },
    },
});

export const updateNote = (parent: Parent, note: Note): Action => ({
    type: NOTE_UPDATE,
    payload: {
        parent,
        request: {
            method: 'patch',
            url: `${parent.typeName}s/${parent.id}/notes/${note.id}`,
            data: note.toJS(),
        },
    },
});
