/* @flow */

/* External dependencies */
import { fromJS, Map } from 'immutable';

/* Internal dependencies */
import {
  GUI_TOGGLE_APP_SIDEBAR,
  GUI_TOGGLE_GLOBAL_DIALOG,
  GUI_TOGGLE_GLOBAL_SNACKBAR,
} from '../action-types';

/* Types */
import type { Action } from 'lib/types';

type State = Map<string, any>;

const initialState = fromJS({
  layout: {
    sidebarOpen: false,
  },
  globalDialog: {
    open: false,
    title: '',
    message: '',
    noticeType: 'inform',
  },
  globalSnackbar: {
    open: false,
    message: '',
    noticeType: 'inform',
  },
});

export default function reducer(
  state: State = initialState,
  action: Action,
) {
  switch (action.type) {
    case GUI_TOGGLE_APP_SIDEBAR:
      const sidebarStatus = state.getIn(['layout', 'sidebarOpen']);
      return state.setIn(['layout', 'sidebarOpen'], !sidebarStatus);

    case GUI_TOGGLE_GLOBAL_DIALOG:
      const { payload: dialog } = (action: Object);
      const isDialogOpen = state.getIn(['globalDialog', 'open']);
      return state.set('globalDialog', fromJS({
        open: !isDialogOpen,
        title: dialog.title,
        message: dialog.message,
        noticeType: dialog.noticeType,
      }));

    case GUI_TOGGLE_GLOBAL_SNACKBAR:
      const { payload: snackbar } = (action: Object);
      const isSnackbarOpen = state.getIn(['globalSnackbar', 'open']);
      return state.set('globalSnackbar', fromJS({
        open: !isSnackbarOpen,
        message: snackbar.message,
        noticeType: snackbar.noticeType,
      }));

    default:
      return state;
  }
}
