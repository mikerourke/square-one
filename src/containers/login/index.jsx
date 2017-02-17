/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/*
 * Internal dependencies
 */
import { actions as userActions } from 'state/user';
import Logo from 'components/logo';
import { inline } from 'style/mui';

const Container = styled.div`
    display: flex;
    flex-flow: none;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    text-align: center;
`;

export class LoginPage extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { push } = this.context.router;
        push('/leads');
    }

    render() {
        return (
            <Container>
                <Paper
                    style={{
                        ...inline.paper,
                        marginTop: 56,
                        padding: 32,
                        width: 350,
                    }}
                >
                    <HeaderContainer>
                        <Logo
                            width={64}
                            height={64}
                        />
                    </HeaderContainer>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            floatingLabelText="Login"
                            fullWidth={true}
                        />
                        <TextField
                            floatingLabelText="Password"
                            fullWidth={true}
                            type="password"
                        />
                        <RaisedButton
                            fullWidth={true}
                            label="Login"
                            primary={true}
                            type="submit"
                        />
                        <FlatButton
                            fullWidth={true}
                            label="Forgot Password?"
                        />
                    </form>
                </Paper>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
