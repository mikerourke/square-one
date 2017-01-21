import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as leadActions from 'data/leads/actions';
import { getSetting } from 'data/settings/actions';
import { globalStyles } from 'scenes/styles';
import { Map } from 'immutable';
import LeadDetailsForm from './components/LeadDetailsForm';

class ManageLeadPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            lead: props.lead,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        console.log('Test!');
    }

    handleChange(event, keyOrNewValue, payload) {
        const fieldName = payload ? 'source' : event.target.name;
        const fieldValue = payload || keyOrNewValue;
        const lead = this.state.lead;
        lead[fieldName] = fieldValue;
        return this.setState({ lead });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { updateLead } = this.props.actions;
        updateLead(this.state.lead).then(() => {
            this.context.router.push('/leads');
        });
    }

    render() {
        const { sources } = this.props;
        return (
            <div style={globalStyles.formContainer}>
                <LeadDetailsForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    sources={sources.data}
                    lead={this.state.lead}
                />
            </div>
        );
    }
}

ManageLeadPage.propTypes = {
    lead: PropTypes.object,
    sources: PropTypes.instanceOf(Map).isRequired,
    actions: PropTypes.object.isRequired,
};

ManageLeadPage.defaultProps = {
    lead: {},
};

ManageLeadPage.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    let leadOnPage = {};
    if (ownProps.params.id) {
        const leadId = ownProps.params.id.toString();
        leadOnPage = state.leads.get(leadId);
    }
    return {
        lead: leadOnPage,
        sources: state.settings.get('sources'),
    };
};

const mapDispatchToProps = (dispatch) => {
    const combinedActions = Object.assign({}, leadActions, { getSetting });
    return {
        actions: bindActionCreators(combinedActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
