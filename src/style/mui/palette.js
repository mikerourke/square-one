/* @flow */

/* External dependencies */
import * as muiColors from 'material-ui/styles/colors';

/**
 * Custom palette colors for the Material UI theme.
 */
export const primary1Color: string = muiColors.grey700;
export const primary2Color: string = muiColors.grey500;
export const primary3Color: string = muiColors.grey300;
export const accent1Color: string = muiColors.blueA200;
export const accent2Color: string = muiColors.grey100;
export const accent3Color: string = muiColors.grey500;
export const textColor: string = muiColors.grey900;
export const alternateTextColor: string = muiColors.white;
export const borderColor: string = muiColors.grey300;
export const pickerHeaderColor: string = muiColors.grey500;
export const canvasColor: string = muiColors.white;

/**
 * Colors to use for notifications based on notice type.
 * @type {Object}
 */
export const noticeColors = {
  error: muiColors.pink700,
  inform: muiColors.grey800,
  success: muiColors.green700,
  none: primary1Color,
};

export default {
  primary1Color,
  primary2Color,
  primary3Color,
  accent1Color,
  accent2Color,
  accent3Color,
  textColor,
  alternateTextColor,
  borderColor,
  pickerHeaderColor,
  canvasColor,
};
