/* @flow */

/* Internal dependencies */
import { GUI_TOGGLE_APP_SIDEBAR } from '../action-types';

/* Types */
import type { Action } from 'lib/types';

type State = {
    appSidebarOpen: boolean,
};

const initialState = {
    appSidebarOpen: false,
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case GUI_TOGGLE_APP_SIDEBAR:
            return {
                ...state,
                appSidebarOpen: !state.appSidebarOpen,
            };

        default:
            return state;
    }
};
