import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

    handleChange() {

    }

    handleSubmit(event) {
        this.context.router.push('/leads');
    }

    render() {
        const { lists } = this.props;
        return (
            <div style={globalStyles.formContainer}>
                <LeadDetailsForm
                    sources={lists.sources}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    lead={this.state.lead}
                />
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

const getLeadById = (leads, id) => {
    const lead = leads.filter(lead => lead.id === id);
    if (lead) {
        return lead[0];
    } else {
        return null;
    }
};

const mapStateToProps = (state, ownProps) => {
    const leadId = ownProps.params.id;
    let lead = {};
    if (leadId && state.leads.length > 0) {
        lead = getLeadById(state.leads, leadId);
    }
    return {
        lead: lead,
        lists: state.lists,
    }
};

export default connect(mapStateToProps)(ManageLeadPage);
