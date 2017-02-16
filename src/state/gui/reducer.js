import {
    GUI_TOGGLE_APP_SIDEBAR,
} from '../action-types';

const initialState = {
    appSidebarOpen: false,
};

export default (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case GUI_TOGGLE_APP_SIDEBAR:
            return {
                ...state,
                appSidebarOpen: !state.appSidebarOpen,
            };

        default:
            return state;
    }
};
