/* @flow */

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
import NotesList from './components/notes-list';
import PageHeaderToolbar from './components/page-header-toolbar';
import TabsToolbar from 'components/tabs-toolbar';

/* Types */
import type { MapLocation, Selection } from 'lib/types';

class ManageLeadPage extends React.Component {
    props: {
        createLead: (lead: Lead) => void,
        lead: Lead,
        representativesList: Array<Selection>,
        sourcesList: Array<Selection>,
        updateLead: (lead: Lead) => void,
    };

    state: {
        isModalOpen: boolean,
        leadOnPage: Object,
    };

    static defaultProps = {
        lead: new Lead(),
    };

    constructor(props: any) {
        super(props);

        this.state = {
            isModalOpen: false,
            leadOnPage: this.props.lead,
        };

        (this: any).handleFieldChange = this.handleFieldChange.bind(this);
        (this: any).handleLocationChange = this.handleLocationChange.bind(this);
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
        this.setState({ leadOnPage: updatedLead });
    }

    handleLocationChange(newLocation: MapLocation) {
        const { leadOnPage } = this.state;
        const { address, lat, lng } = newLocation;
        console.log(newLocation);
        const updatedLead = leadOnPage.merge({ address, lat, lng });
        this.setState({ leadOnPage: updatedLead });
    }

    handleModalTouchTap(event: Event) {
        event.preventDefault();
        this.setState({ isModalOpen: false });
        const leadEntity = this.state.leadOnPage.toJS();
        let performAction: Function = this.props.createLead;
        if (leadEntity.id !== 0) {
            performAction = this.props.updateLead;
        }
        performAction(leadEntity).then(() => browserHistory.push('/leads'));
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
                        handleLocationChange={this.handleLocationChange}
                        lead={leadOnPage}
                        representativesList={representativesList}
                        sourcesList={sourcesList}
                    />),
            },
            {
                label: 'History',
                content: (<HistoryTab />),
            },
            {
                label: 'Notes',
                content: (<NotesList />),
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
    createLead: lead => dispatch(createLead(lead)),
    updateLead: lead => dispatch(updateLead(lead)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
