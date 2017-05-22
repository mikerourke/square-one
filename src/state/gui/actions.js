/* @flow */

/* Internal dependencies */
import {
  GUI_TOGGLE_APP_SIDEBAR,
  GUI_TOGGLE_GLOBAL_DIALOG,
  GUI_TOGGLE_GLOBAL_SNACKBAR,
} from '../action-types';

/* Types */
import type { Action, NoticeType } from 'lib/types';

export const toggleAppSidebar = (): Action => ({
  type: GUI_TOGGLE_APP_SIDEBAR,
});

export const toggleGlobalDialog = (
  title?: string = '',
  message?: string = '',
  noticeType?: NoticeType = 'inform',
): Action => ({
  type: GUI_TOGGLE_GLOBAL_DIALOG,
  payload: {
    title,
    message,
    noticeType,
  },
});

export const toggleGlobalSnackbar = (
  message?: string,
  noticeType?: NoticeType = 'inform',
): Action => ({
  type: GUI_TOGGLE_GLOBAL_SNACKBAR,
  payload: {
    message,
    noticeType,
  },
});
