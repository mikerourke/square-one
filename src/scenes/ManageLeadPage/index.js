import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { toJS } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Lead, actions as leadActions } from 'data/leads';
import { Setting, actions as settingsActions } from 'data/settings';
import { globalStyle } from 'scenes/styles';
import LeadDetailsForm from './components/LeadDetailsForm';

class ManageLeadPage extends Component {
    static propTypes = {
        lead: ImmutablePropTypes.record,
        sourcesList: PropTypes.array.isRequired,
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
        const updatedLead = this.state.lead.set(fieldName, fieldValue);
        return this.setState({ lead: updatedLead });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { createLead, updateLead } = this.props.actions;
        const leadEntity = this.state.lead.toJS();
        const performAction = leadEntity.id === 0 ?
                              createLead :
                              updateLead;
        performAction(leadEntity).then(() => {
            this.context.router.push('/leads');
        });
    }

    render() {
        const { sourcesList } = this.props;
        return (
            <LeadDetailsForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                sourcesList={sourcesList}
                lead={this.state.lead}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let leadOnPage = new Lead();
    if (ownProps.params.id) {
        const leadId = ownProps.params.id.toString();
        leadOnPage = state.leads.get(leadId);
    }
    return {
        lead: leadOnPage,
        sourcesList: state.settings.get('sources').getData(),
    };
};

const mapDispatchToProps = (dispatch) => {
    const combinedActions = Object.assign({}, leadActions, settingsActions);
    return {
        actions: bindActionCreators(combinedActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
