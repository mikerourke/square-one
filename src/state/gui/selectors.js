/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getGui = state => state.get('gui');

export const selectGuiLayout = createSelector(
  getGui,
  gui => gui.get('layout'),
);

export const selectGuiGlobalDialog = createSelector(
  getGui,
  gui => gui.get('globalDialog'),
);

export const selectGuiGlobalSnackbar = createSelector(
  getGui,
  gui => gui.get('globalSnackbar'),
);
