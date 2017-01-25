import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Lead, leadActions } from 'data/leads';
import { Setting, settingsActions } from 'data/settings';
import { globalStyles } from 'scenes/styles';
import LeadDetailsForm from './components/LeadDetailsForm';

class ManageLeadPage extends Component {
    static propTypes = {
        lead: PropTypes.instanceOf(Lead),
        sources: PropTypes.instanceOf(Setting).isRequired,
        actions: PropTypes.object.isRequired,
    };

    static defaultProps = {
        lead: new Lead(),
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            lead: props.lead,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, keyOrNewValue, payload) {
        const fieldName = payload ? 'source' : event.target.name;
        const fieldValue = payload || keyOrNewValue;
        const lead = this.state.lead;
        lead.set(fieldName, fieldValue);
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
    const combinedActions = Object.assign({}, leadActions, settingsActions);
    return {
        actions: bindActionCreators(combinedActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
