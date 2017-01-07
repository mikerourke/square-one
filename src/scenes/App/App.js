import React, { PropTypes } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { ActionHome } from 'material-ui/svg-icons';

import theme from './theme';
import Sidebar from './components/Sidebar';

const styles= {
    icon: {
        color: 'white',
        cursor: 'pointer',
        width: '24px',
        height: '48px',
        padding: '0 8px'
    },
    
    body: {
        paddingLeft: '24px'
    }
};

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            open: false
        };
        
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    handleToggle() {
        this.setState({
            open: !this.state.open
        });
    }
    
    handleClose() {
        this.setState({
            open: false
        });
    }
    
    render() {
        return (
            <MuiThemeProvider muiTheme={theme}>
                <div>
                    <AppBar 
                        iconElementRight={<ActionHome style={styles.icon} />}
                        onLeftIconButtonTouchTap={this.handleToggle}
                    />
                    <Sidebar open={this.state.open}
                             onToggleDrawer={this.handleToggle}
                             iconStyle={styles.icon}
                    />
                    <div style={styles.body}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

export default App;