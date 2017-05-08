/* @flow */

/* External dependencies */
import { fromJS, Map } from 'immutable';

/* Internal dependencies */
import { GUI_TOGGLE_APP_SIDEBAR } from '../action-types';

/* Types */
import type { Action } from 'lib/types';

type State = Map<string, any>;

const initialState = fromJS({
    layout: {
        sidebarOpen: false,
    },
});

const guiReducer = (
    state: State = initialState,
    action: Action,
) => {
    switch (action.type) {
        case GUI_TOGGLE_APP_SIDEBAR:
            const sidebarStatus = state.getIn(['layout', 'sidebarOpen']);
            return state.setIn(['layout', 'sidebarOpen'], !sidebarStatus);

        default:
            return state;
    }
};

export default guiReducer;
