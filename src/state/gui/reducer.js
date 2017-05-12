/* @flow */

/* External dependencies */
import { fromJS, Map } from 'immutable';

/* Internal dependencies */
import {
  GUI_TOGGLE_APP_SIDEBAR,
  GUI_TOGGLE_PROMPT_DIALOG,
} from '../action-types';

/* Types */
import type { Action } from 'lib/types';

type State = Map<string, any>;

const initialState = fromJS({
  layout: {
    sidebarOpen: false,
  },
  promptDialog: {
    open: false,
    title: '',
    message: '',
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

    case GUI_TOGGLE_PROMPT_DIALOG:
      const { payload: { title, message } } = (action: Object);
      const isOpen = state.getIn(['promptDialog', 'open']);
      return state.set('promptDialog', fromJS({
        open: !isOpen,
        title,
        message,
      }));

    default:
      return state;
  }
}
