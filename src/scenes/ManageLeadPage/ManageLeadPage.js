import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as leadActions from 'data/leads/actions';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import LocationSearchBox from './components/LocationSearchBox';
import Dropdown from './components/Dropdown';
import LeadForm from './components/LeadForm'

import { globalStyles } from '../styles';

const formStyles = globalStyles.twoColumnForm;
const paperStyle = Object.assign({}, globalStyles.paper, {width: '90%'});

class ManageLeadPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isNew: true,
            source: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(JSON.stringify(values));
    }

    render() {
        return (
            <div style={globalStyles.formContainer}>
                <Paper style={paperStyle}>
                    <LeadForm handleSubmit={this.handleSubmit} />
                </Paper>
            </div>
        );
    }
}

ManageLeadPage.propTypes = {
    isNew: PropTypes.bool,
};

ManageLeadPage.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = state => ({
    leads: state.leads,
});

const mapDispatchToProps = dispatch => bindActionCreators(leadActions, dispatch);

export default ManageLeadPage;
