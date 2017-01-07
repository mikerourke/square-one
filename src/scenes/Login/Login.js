import React, { PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const styles = {
    form: {
        textAlign: 'center'
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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        
        return (
            <div>
                <RaisedButton label="Login" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Test"
                    actions={actions}
                    modal={true}
                    open={this.state.open}>
                    
                    <form className="login" 
                          style={styles.form} 
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
                </Dialog>
            </div>
        );
    }
}

Login.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
};

export default Login;