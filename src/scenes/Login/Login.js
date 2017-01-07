import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const styles = {
    form: {
        width: '100px',
        height: '100px',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        margin: 'auto'
    },
    
    centerFlex: {
        display: 'flex',
        justifyContent: 'center'
    }
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            open: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        console.log(`User: ${username} Password: ${password}`);
    }
    
    handleOpen() {
        this.setState({open: true});
    }
    
    handleClose() {
        this.setState({open: false});
    }
    
    render() {
        
        return (
            <div style={styles.centerFlex}>
                <form className="login" 
                      onSubmit={this.handleSubmit}>
                    <TextField 
                        ref="username"
                        floatingLabelText="Login"
                    />
                    <br/>
                    <TextField
                        ref="password"
                        floatingLabelText="Password"
                        type="password"
                    />
                    <br/>
                    <RaisedButton 
                        label="Login" 
                        onClick={this.handleSubmit} 
                        onTouchTap={this.handleSubmit}
                    />
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
};

export default Login;