import {
    GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAIL,
    GET_ALL_LISTS, GET_ALL_LISTS_SUCCESS, GET_ALL_LISTS_FAIL,
    UPDATE_LIST, UPDATE_LIST_SUCCESS, UPDATE_LIST_FAIL
} from './actionTypes';

const initialState = {
    sources: [],
};

const lists = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_SUCCESS:
            return Object.assign({}, state, {
                sources: action.payload.data[0].items
            });

        default:
            return state;
    }
};

export default lists;
