import {
    GET_LIST,
    UPDATE_LIST,
} from './actionTypes';

export const getList = listName => ({
    type: GET_LIST,
    payload: {
        request: {
            type: 'get',
            url: `/lists?listName=${listName}`,
        }
    }
});
