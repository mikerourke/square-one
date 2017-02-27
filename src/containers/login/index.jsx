/* @flow */

/* External dependencies */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import * as userActions from 'state/user/actions';
import Logo from 'components/logo';

/**
 * Styled container for page content.
 */
const PageContainer = styled.div`
    display: flex;
    flex-flow: none;
    justify-content: center;
`;

/**
 * Styled container for header content.
 */
const HeaderContainer = styled.div`
    text-align: center;
`;

export class LoginPage extends React.Component {
    props: {
        actions: any,
    };

    handleSubmit = (event: Event): void => {
        event.preventDefault();
        browserHistory.push('/leads');
    };

    render(): React.Element<*> {
        return (
            <PageContainer>
                <Paper
                    style={{
                        display: 'block',
                        marginTop: 56,
                        maxWidth: 1200,
                        padding: 32,
                        width: 350,
                    }}
                >
                    <HeaderContainer>
                        <Logo
                            height={64}
                            width={64}
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
                            style={{ marginTop: 24 }}
                            type="submit"
                        />
                        <FlatButton
                            label="Forgot Password?"
                            style={{
                                marginTop: 24,
                                width: '100%',
                            }}
                        />
                    </form>
                </Paper>
            </PageContainer>
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
