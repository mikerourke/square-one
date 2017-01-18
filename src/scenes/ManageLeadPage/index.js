import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as leadActions from 'data/leads/actions';
import { globalStyles } from 'scenes/styles';
import LeadDetailsForm from './components/LeadDetailsForm';

class ManageLeadPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            lead: Object.assign({}, props.lead),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, keyOrNewValue, payload) {
        const fieldName = payload ? 'source' : event.target.name;
        const fieldValue = payload ? payload : keyOrNewValue;
        let lead = this.state.lead;
        lead[fieldName] = fieldValue;
        return this.setState({lead: lead});
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
                    sources={sources}
                    lead={this.state.lead}
                />
            </div>
        );
    }
}

ManageLeadPage.propTypes = {
    lead: PropTypes.object,
    sources: PropTypes.array,
    actions: PropTypes.object,
};

ManageLeadPage.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    const leadId = ownProps.params.id.toString();
    let existingLead = state.leads.find(lead => lead.id.toString() === leadId);
    return {
        lead: existingLead,
        sources: state.lists.sources,
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(leadActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
