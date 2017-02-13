import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from 'data/user';
import { actions as leadActions } from 'data/leads';
import Logo from 'components/Logo';
import Button from './components/Button';
import Container from './components/Container';
import Header from './components/Header';
import HeaderText from './components/HeaderText';
import Paper from './components/Paper';
import TextInput from './components/TextInput';

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
        const { getAllLeads } = this.props.actions;
        const { push } = this.context.router;
        getAllLeads().then(() => {
            push('/leads');
        });
    }

    render() {
        return (
            <Container>
                <Paper>
                    <form onSubmit={this.handleSubmit}>
                        <Header>
                            <Logo
                                width="24px"
                                height="24px"
                            />
                            <HeaderText>
                                SQUARE1
                            </HeaderText>
                        </Header>
                        <TextInput
                            floatingLabelText="Login"
                        />
                        <TextInput
                            floatingLabelText="Password"
                            type="password"
                        />
                        <Button
                            label="Login"
                            type="submit"
                        />
                    </form>
                </Paper>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => {
    const combinedActions = Object.assign({}, userActions, leadActions);
    return {
        actions: bindActionCreators(combinedActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
