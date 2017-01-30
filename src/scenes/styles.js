import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as muiColors from 'material-ui/styles/colors';

export const muiTheme = getMuiTheme({
    palette: {
        primary1Color: muiColors.grey500,
        primary2Color: muiColors.grey700,
        primary3Color: muiColors.lightBlue700,
        accent1Color: muiColors.lightBlue500,
        accent2Color: muiColors.lightBlue100,
        accent3Color: muiColors.lightBlue700,
        textColor: muiColors.grey900,
        alternateTextColor: muiColors.grey100,
        borderColor: muiColors.grey400,
        pickerHeaderColor: muiColors.grey500,
    },
});

const columnSideStyle = {
    flex: '1 0',
    margin: '0 auto',
    minWidth: '400px',
    width: '400px',
};

const defaultTopMargin = '2em';

export default {
    body: {
        padding: '10px',
    },
    button: {
        marginTop: defaultTopMargin,
    },
    formContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        marginTop: defaultTopMargin,
    },
    iconButton: {
        cursor: 'pointer',
        padding: 0,
    },
    input: {
        margin: '0 1em',
        width: '90%',
    },
    menuItemIcon: {
        marginRight: '24px',
    },
    paper: {
        padding: '3em',
    },
    twoColumnForm: {
        leftSide: Object.assign({},
            columnSideStyle, {
                maxWidth: '600px',
            }),
        rightSide: Object.assign({},
            columnSideStyle, {
                maxWidth: '800px',
            }),
        firstButton: {
            marginTop: defaultTopMargin,
            marginLeft: '1em',
        },
    },
};
