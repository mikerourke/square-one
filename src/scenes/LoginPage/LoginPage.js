import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from 'data/user';
import { actions as leadActions } from 'data/leads';
import Logo from 'components/Logo';
import globalStyles from 'scenes/styles';
import {
    Button,
    Container,
    Header,
    HeaderText,
    Paper,
    TextInput,
} from './components';

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
        this.props.actions.getAllLeads().then(() => {
            this.context.router.push('/leads');
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
