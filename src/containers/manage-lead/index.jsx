// @flow

/* External dependencies */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* Internal dependencies */
import Lead from 'state/leads/model';
import { createLead, updateLead } from 'state/leads/actions';
import HistoryTab from './components/history-tab';
import LeadDetailsForm from './components/details-form';
import MessagesModal from './components/messages-modal';
import PageHeaderToolbar from './components/page-header-toolbar';
import TabsToolbar from 'components/tabs-toolbar';

/* Types */
import type { Selection } from '../../types';

class ManageLeadPage extends React.Component {
    props: {
        createLead: () => void,
        lead: Lead,
        updateLead: () => void,
        representativesList: Array<Selection>,
        sourcesList: Array<Selection>,
    };

    state: {
        isModalOpen: boolean,
        leadOnPage: Object,
    };

    static defaultProps = {
        createLead: () => {},
        lead: new Lead(),
        updateLead: () => {},
    };

    constructor(props: any) {
        super(props);

        this.state = {
            isModalOpen: false,
            leadOnPage: this.props.lead,
        };

        (this: any).handleFieldChange = this.handleFieldChange.bind(this);
        (this: any).handleModalTouchTap = this.handleModalTouchTap.bind(this);
        (this: any).handleSaveTouchTap = this.handleSaveTouchTap.bind(this);
        (this: any).handleBackTouchTap = this.handleBackTouchTap.bind(this);
    }

    handleFieldChange(event: Event, newValue: string, fieldName: string = '') {
        let nameOfField = fieldName;
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            nameOfField = target.name;
        }
        const { leadOnPage } = this.state;
        const updatedLead = leadOnPage.set(nameOfField, newValue);
        this.setState({
            leadOnPage: updatedLead,
        });
    }

    handleModalTouchTap(event: Event) {
        event.preventDefault();
        this.setState({ isModalOpen: false });
        const leadEntity = this.state.leadOnPage.toJS();
        if (leadEntity.id === 0) {
            const createLeadFn: Function = this.props.createLead;
            if (createLeadFn) {
                createLeadFn().then(() => browserHistory.push('/leads'));
            }
        } else {
            const updateLeadFn: Function = this.props.updateLead;
            if (updateLeadFn) {
                updateLeadFn().then(() => browserHistory.push('/leads'));
            }
        }
    }

    handleBackTouchTap(event: Event) {
        event.preventDefault();
        browserHistory.push('/leads');
    }

    handleSaveTouchTap(event: Event) {
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

const mapDispatchToProps = dispatch => ({
    dispatch,
    createLead: () => dispatch(createLead()),
    updateLead: () => dispatch(updateLead()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
