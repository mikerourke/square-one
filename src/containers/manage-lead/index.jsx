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
import CardList from 'components/card-list';
import PageHeaderToolbar from './components/page-header-toolbar';
import TabsToolbar from 'components/tabs-toolbar';

const apiData = require('../../../internals/api/db.json');

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
    }

    /**
     * Returns to the Leads List when the onTouchTap event is triggered for the
     *      Back arrow button in the header.
     */
    handleBackTouchTap = (event: Event) => {
        event.preventDefault();
        browserHistory.push('/leads');
    };

    /**
     * Updates the Lead held in local state with the data from the field on the
     *      Details Form component.
     */
    handleFieldChange = (event: Event, newValue: string,
                         fieldName?: string = '') => {
        let nameOfField = fieldName;

        // This is done to pass Flow type checking.
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            nameOfField = target.name;
        }

        // Update the Lead held in local state (Immutable Record).
        const { leadOnPage } = this.state;
        const updatedLead = leadOnPage.set(nameOfField, newValue);
        this.setState({ leadOnPage: updatedLead });
    };

    /**
     * Updates the address, latitude, and longitude of the Lead held in local
     *      state when the Places Autocomplete input is changed on the
     *      Details Form.
     */
    handleLocationChange = (newLocation: MapLocation) => {
        const { leadOnPage } = this.state;
        const { address, lat, lng } = newLocation;
        const updatedLead = leadOnPage.merge({ address, lat, lng });
        this.setState({ leadOnPage: updatedLead });
    };

    /**
     * Updates existing Lead or creates a new Lead based on the ID of the Lead
     *      held in local state.
     */
    handleModalTouchTap = (event: Event) => {
        event.preventDefault();

        // Ensure the Messages dialog closes before the save/update action is
        // performed.
        this.setState({ isModalOpen: false });

        // Convert the Lead in local state from an Immutable Record to a
        // JavaScript object for the API call.
        const leadEntity = this.state.leadOnPage.toJS();

        // If the ID is 0 (the default), a new Lead needs to be created,
        // otherwise update the Lead that corresponds with the ID.
        let performAction: Function = this.props.createLead;
        if (leadEntity.id !== 0) {
            performAction = this.props.updateLead;
        }
        performAction(leadEntity).then(() => browserHistory.push('/leads'));
    };

    /**
     * Show the Messages dialog form when the Save button is pressed.
     */
    handleSaveTouchTap = (event: Event) => {
        event.preventDefault();
        this.setState({ isModalOpen: true });
    };

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
                content:
                    (<CardList
                        cardContents={apiData.notes}
                    />),
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
