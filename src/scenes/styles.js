import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as muiColors from 'material-ui/styles/colors';

const palette = {
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

const spacing = {
    gutterMini: '8px',
    gutterLess: '16px',
    gutterStandard: '24px',
    gutterMore: '32px',
};

const typography = {
    standardSize: '14px',
    headerSize: '24px',
};

export const muiTheme = getMuiTheme({
    palette,
    fontFamily: 'Roboto',
});

const columnSideStyle = {
    flex: '1 0 auto',
    margin: '0 auto',
    minWidth: '400px',
    padding: `0 ${spacing.gutterMini}`,
    width: '400px',
};

export default {
    palette,
    spacing,
    typography,
    button: {
        margin: `${spacing.gutterMore} 0 0 0`,
    },
    floatingActionButton: {
        margin: 0,
        right: '32px',
        bottom: '32px',
        position: 'fixed',
    },
    formContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
    },
    iconButton: {
        cursor: 'pointer',
        padding: 0,
    },
    input: {
        // margin: `0 ${spacing.gutterStandard}`,
        width: '95%',
    },
    menuItemIcon: {
        marginRight: spacing.gutterStandard,
    },
    paper: {
        margin: '56px auto',
        maxWidth: '1200px',
    },
    twoColumnForm: {
        leftSide: Object.assign({},
            columnSideStyle, {
            }),
        rightSide: Object.assign({},
            columnSideStyle, {
            }),
        fullWidthInput: {
            margin: `0 ${spacing.gutterStandard}`,
            width: '95%',
        },
        firstButton: {
            paddingTop: spacing.gutterLess,
            paddingBottom: spacing.gutterLess,
            paddingLeft: spacing.gutterStandard,
        },
    },
};

