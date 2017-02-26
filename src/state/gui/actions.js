/* @flow */

/* Internal dependencies */
import { GUI_TOGGLE_APP_SIDEBAR } from '../action-types';

/* Types */
import type { Action } from 'lib/types';

export const toggleAppSidebar = (): Action => ({
    type: GUI_TOGGLE_APP_SIDEBAR,
});
