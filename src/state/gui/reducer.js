/* @flow */

/* External dependencies */
import { fromJS, Map } from 'immutable';

/* Internal dependencies */
import { GUI_TOGGLE_APP_SIDEBAR } from '../action-types';

/* Types */
import type { Action } from 'lib/types';

type State = Map<string, any>;

const initialState = fromJS({
    appSidebarOpen: false,
});

const gui = (
    state: State = initialState,
    action: Action,
) => {
    switch (action.type) {
        case GUI_TOGGLE_APP_SIDEBAR:
            const currentStatus = state.get('appSidebarOpen');
            return state.set('appSidebarOpen', !currentStatus);

        default:
            return state;
    }
};

export default gui;
