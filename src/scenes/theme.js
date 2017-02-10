import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as muiColors from 'material-ui/styles/colors';

export const palette = {
    primary1Color: muiColors.grey500,
    primary2Color: muiColors.grey700,
    primary3Color: muiColors.grey100,
    accent1Color: muiColors.blueA200,
    accent2Color: muiColors.green500,
    accent3Color: muiColors.blue500,
    textColor: muiColors.grey900,
    alternateTextColor: muiColors.white,
    borderColor: muiColors.grey300,
    pickerHeaderColor: muiColors.blue500,
    canvasColor: muiColors.white,
};

export default getMuiTheme({
    palette,
    fontFamily: 'Roboto',
});
