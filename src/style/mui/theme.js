import getMuiTheme from 'material-ui/styles/getMuiTheme';
import palette from './palette';

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
    raisedButton: {
        textColor: palette.primary1Color,
    },
    tabs: {
        backgroundColor: palette.canvasColor,
        textColor: palette.primary1Color,
        selectedTextColor: palette.primary1Color,
    },
    toolbar: {
        backgroundColor: palette.alternateTextColor,
        height: 48,
    },
});
