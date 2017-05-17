/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getSettingsByName = state => state.getIn(['settings', 'byName']);

export const selectListSettings = createSelector(
  getSettingsByName,
  (settings) => {
    const listSettings = {};
    if (settings) {
      settings.forEach((setting) => {
        const { category, settingName, data } = setting;
        if (category === 'lists') {
          listSettings[settingName] = data.toArray();
        }
      });
      return listSettings;
    }
    return [];
  },
);
