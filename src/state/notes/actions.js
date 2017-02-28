/* @flow */

/* External dependencies */
import { normalize } from 'normalizr';
import axios from 'axios';

/* Internal dependencies */
import {
    NOTE_CREATE,
    NOTE_DELETE,
    NOTE_GET_ALL,
    NOTE_GET_SINGLE,
    NOTE_UPDATE,
} from '../action-types';
import Note, { noteSchema } from './model';

/* Types */
import type { Action } from 'lib/types';

const BASE_URL = '/notes';

export const createNote = (note: Note): Action => ({
    type: NOTE_CREATE,
    payload: {
        request: {
            method: 'post',
            url: BASE_URL,
            data: note,
        },
    },
});

export const deleteNote = (id: number): Action => ({
    type: NOTE_DELETE,
    payload: {
        request: {
            method: 'delete',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const updateNote = (note: Note): Action => ({
    type: NOTE_UPDATE,
    payload: {
        request: {
            method: 'patch',
            url: `${BASE_URL}/${note.id}`,
            data: note,
        },
    },
});

export const getNote = (id: number): Action => ({
    type: NOTE_GET_SINGLE,
    payload: {
        request: {
            method: 'get',
            url: `${BASE_URL}/${id}`,
        },
    },
});

export const getAllNotes = (urlPrefix?: string = ''): Action => ({
    type: NOTE_GET_ALL,
    payload: {
        request: {
            method: 'get',
            url: `${urlPrefix}${BASE_URL}`,
            transformResponse:
                axios.defaults.transformResponse.concat((data) => {
                    if (data) {
                        return normalize(data, noteSchema);
                    }
                    return {};
                }),
        },
    },
});

