import {
    GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAIL,
    GET_ALL_LISTS, GET_ALL_LISTS_SUCCESS, GET_ALL_LISTS_FAIL,
    UPDATE_LIST, UPDATE_LIST_SUCCESS, UPDATE_LIST_FAIL,
} from './actionTypes';

const initialState = {
    sources: [],
    leadStatuses: [],
};

const lists = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_SUCCESS:
            let list = {};
            list = action.payload.data.find(item => {
                return item.listName === action.listName;
            });
            return Object.assign({}, state, {
                [action.listName]: list.items,
            });

        case GET_ALL_LISTS_SUCCESS:
            return action.payload.data;

        default:
            return state;
    }
};

export default lists;
