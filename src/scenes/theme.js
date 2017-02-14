import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as muiColors from 'material-ui/styles/colors';

/* eslint-disable no-bitwise */
export const getRgbFromHex = (hex) => {
    let newHex = hex.replace(/^#/, '');

    if (newHex.length === 3) {
        newHex = newHex[0] + newHex[0] + newHex[1]
               + newHex[1] + newHex[2] + newHex[2];
    }

    const bigInt = parseInt(newHex, 16);
    return {
        r: (bigInt >> 16) & 255,
        g: (bigInt >> 8) & 255,
        b: bigInt & 255,
    };
};
/* eslint-enable no-bitwise */

export const palette = {
    primary1Color: muiColors.grey700,
    primary2Color: muiColors.grey500,
    primary3Color: muiColors.grey100,
    accent1Color: muiColors.blueA200,
    accent2Color: muiColors.grey100,
    accent3Color: muiColors.grey500,
    textColor: muiColors.grey900,
    alternateTextColor: muiColors.white,
    borderColor: muiColors.grey300,
    pickerHeaderColor: muiColors.grey500,
    canvasColor: muiColors.white,
};

export default getMuiTheme({
    palette,
    fontFamily: 'Roboto',
    appBar: {
        color: palette.canvasColor,
        textColor: palette.primary1Color,
    },
    inkBar: {
        backgroundColor: palette.primary1Color,
    },
    tabs: {
        backgroundColor: palette.canvasColor,
        textColor: palette.primary1Color,
        selectedTextColor: palette.primary1Color,
    },
});
