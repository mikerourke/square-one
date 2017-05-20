/* @flow */

/* Internal dependencies */
import {
  GUI_TOGGLE_APP_SIDEBAR,
  GUI_TOGGLE_PROMPT_DIALOG,
} from '../action-types';

/* Types */
import type { Action } from 'lib/types';

export const toggleAppSidebar = (): Action => ({
  type: GUI_TOGGLE_APP_SIDEBAR,
});

export const togglePromptDialog = (
  title?: string = '',
  message?: string = '',
  actionType?: string = '',
): Action => ({
  type: GUI_TOGGLE_PROMPT_DIALOG,
  payload: {
    title,
    message,
    actionType,
  },
});
