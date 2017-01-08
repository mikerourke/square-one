import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    grey700,
    grey800,
    grey900
} from 'material-ui/styles/colors';

export const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey700,
        primary2Color: grey800,
        pickerHeaderColor: grey700
    }
});

export const globalStyles = {
    flatButton: {
        marginTop: '3em',
        backgroundColor: grey700,
        color: 'white'
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3em',
    },
    input : {
        margin: '0 1em'
    },
    paper: {
        padding: '3em'
    },
    twoColumnForm: {
        wrapper: {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center'
        },
        leftSide: {
            flex: '0',
            margin: '0 auto'
        },
        rightSide: {
            flex: '1 1 0',
            margin: '0 auto'
        }
    }
};