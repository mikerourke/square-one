/* External dependencies */
import getMuiTheme from 'material-ui/styles/getMuiTheme';

/* Internal dependencies */
import palette from './palette';

/**
 * Custom options for the Material UI theme (colors and component options).
 */
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
    tableHeaderColumn: {
        spacing: 8,
    },
    tableRowColumn: {
        spacing: 8,
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
