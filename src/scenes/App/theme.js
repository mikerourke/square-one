import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { 
    grey500, 
    grey700 
} from 'material-ui/styles/colors';

const theme = getMuiTheme({
    palette: {
        primary1Color: grey500,
        primary2Color: grey700,
        pickerHeaderColor: grey500
    }
});

export default theme;