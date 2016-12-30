import React from 'react';
import { grey500, grey700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from '../Header';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: grey500,
        primary2Color: grey700,
        pickerHeaderColor: grey500
    }
});

const App = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Header />
    </MuiThemeProvider>
);

export default App;