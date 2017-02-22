// @flow

import {
    GUI_TOGGLE_APP_SIDEBAR,
} from '../action-types';

type ToggleAppSidebarAction = {
    type: string,
}

export const toggleAppSidebar = (): ToggleAppSidebarAction => ({
    type: GUI_TOGGLE_APP_SIDEBAR,
});
