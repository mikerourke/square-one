/* External dependencies */
import React, { Component, PropTypes } from 'react';
import { toJS } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import TabsToolbar from 'components/tabs-toolbar';

/* Internal dependencies */
import { Lead, actions as leadActions } from 'state/leads';
import { Setting, actions as settingsActions } from 'state/settings';
import LeadDetailsForm from './components/details-form';
import MessagesModal from './components/messages-modal';
import PageHeaderToolbar from './components/page-header-toolbar';
import HistoryTab from './components/history-tab';

type ListItem = {
    id: string,
    value: string,
};

type Props = {
    actions: Object,
    lead: Lead,
    representativesList: Array<ListItem>,
    sourcesList: Array<ListItem>,
};

class ManageLeadPage extends Component {
    props: Props;

    static contextTypes = {
        router: PropTypes.object,
    };

    static defaultProps = {
        lead: new Lead(),
    };

    constructor(props: Props, context: any) {
        super(props, context);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleModalTouchTap = this.handleModalTouchTap.bind(this);
        this.handleSaveTouchTap = this.handleSaveTouchTap.bind(this);
        this.handleBackTouchTap = this.handleBackTouchTap.bind(this);
    }

    state = {
        isModalOpen: false,
        leadOnPage: this.props.lead,
    };

    handleFieldChange(event, newValue, fieldName = '') {
        const { leadOnPage } = this.state;
        const nameOfField = (fieldName === '') ? event.target.name : fieldName;
        const updatedLead = leadOnPage.set(nameOfField, newValue);
        return this.setState({
            leadOnPage: updatedLead,
        });
    }

    handleModalTouchTap(event) {
        event.preventDefault();
        this.setState({ isModalOpen: false });
        const { createLead, updateLead } = this.props.actions;
        const { push } = this.context.router;
        const { leadOnPage } = this.state;
        const leadEntity = leadOnPage.toJS();
        const performAction = leadEntity.id === 0 ?
                              createLead :
                              updateLead;
        performAction(leadEntity).then(() => {
            push('/leads');
        });
    }

    handleBackTouchTap(event) {
        event.preventDefault();
        browserHistory.push('/leads');
    }

    handleSaveTouchTap(event) {
        event.preventDefault();
        this.setState({ isModalOpen: true });
    }

    render() {
        const {
            lead,
            representativesList,
            sourcesList,
        } = this.props;

        const { isModalOpen, leadOnPage } = this.state;

        const tabPages = [
            {
                label: 'Details',
                content:
                    (<LeadDetailsForm
                        handleFieldChange={this.handleFieldChange}
                        representativesList={representativesList}
                        sourcesList={sourcesList}
                        lead={leadOnPage}
                    />),
            },
            {
                label: 'History',
                content: (<HistoryTab />),
            },
            {
                label: 'Appointments',
                content: 'Appointment',
            },
        ];

        return (
            <div>
                <PageHeaderToolbar
                    handleBackTouchTap={this.handleBackTouchTap}
                    handleSaveTouchTap={this.handleSaveTouchTap}
                    lead={lead}
                />
                <TabsToolbar
                    tabPages={tabPages}
                />
                <MessagesModal
                    handleModalTouchTap={this.handleModalTouchTap}
                    isOpen={isModalOpen}
                />
            </div>
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
        representativesList: state.settings.get('representatives').getData(),
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
