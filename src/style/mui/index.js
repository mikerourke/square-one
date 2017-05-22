/* @flow */

/* External dependencies */
import * as muiColors from 'material-ui/styles/colors';

/* Internal dependencies */
import getMuiTheme from './theme';
import * as palette from './palette';

/* Types */
import type { NoticeType } from 'lib/types';


export {
  muiColors,
  getMuiTheme,
  palette,
};

/**
 * Returns the color associated with the specified notice type used for
 *    global notifications.
 * @param {NoticeType} noticeType Type of notice associated with notification.
 * @returns {string}
 */
export const getColorByNoticeType = (noticeType: NoticeType): string => {
  const { noticeColors } = palette;
  return noticeColors[noticeType];
};
