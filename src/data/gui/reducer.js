import {
    TOGGLE_APP_SIDEBAR,
} from './actionTypes.js';

const initialState = {
    appSidebarOpen: false,
};

export default (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case TOGGLE_APP_SIDEBAR:
            return {
                ...state,
                appSidebarOpen: !state.appSidebarOpen,
            };

        default:
            return state;
    }
};
