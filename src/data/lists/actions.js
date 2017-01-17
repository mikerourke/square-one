import {
    GET_LIST,
    GET_ALL_LISTS,
    UPDATE_LIST,
} from './actionTypes';

export const getList = listName => ({
    type: GET_LIST,
    listName,
    payload: {
        request: {
            type: 'get',
            url: `/lists?listName=${listName}`,
        }
    }
});

export const getAllLists = () => ({
    type: GET_ALL_LISTS,
    payload: {
        request: {
            type: 'get',
            url: `/lists`,
        }
    }
});
