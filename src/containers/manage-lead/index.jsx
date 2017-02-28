/* @flow */

/* External dependencies */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* Internal dependencies */
import { createLead, updateLead } from 'state/leads/actions';
import Lead from 'state/leads/model';
import { getAllChanges } from 'state/changes/actions';
import Change from 'state/changes/model';
import { getAllNotes } from 'state/notes/actions';
import Note from 'state/notes/model';
import HistoryTab from './components/history-tab';
import LeadDetailsForm from './components/details-form';
import MessagesModal from './components/messages-dialog';
import CardList from 'components/card-list';
import PageHeaderToolbar from './components/page-header-toolbar';
import TabsToolbar from 'components/tabs-toolbar';

/* Types */
import type { MapLocation, Selection } from 'lib/types';
import type { Map } from 'immutable';

class ManageLeadPage extends React.Component {
    props: {
        actions: any,
        changes: Map<number, Change>,
        lead: Lead,
        notes: Map<number, Note>,
        representativesList: Array<Selection>,
        sourcesList: Array<Selection>,
    };

    state: {
        areChildEntitiesLoaded: boolean,
        isModalOpen: boolean,
        leadOnPage: Object,
    };

    constructor(props: any) {
        super(props);

        this.state = {
            areChildEntitiesLoaded: false,
            isModalOpen: false,
            leadOnPage: this.props.lead,
        };
    }

    componentDidMount(): void {
        const { actions, lead } = this.props;
        const urlPrefix = `/leads/${lead.id}`;
        const getChanges = actions.getAllChanges(urlPrefix);
        const getNotes = actions.getAllNotes(urlPrefix);
        Promise.all([getChanges, getNotes]).then(() => {
            this.setState({ areChildEntitiesLoaded: true });
        });
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
    handleInputChange = (event: Event, newValue: string,
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
        let performAction: Function = this.props.actions.createLead;
        if (leadEntity.id !== 0) {
            performAction = this.props.actions.updateLead;
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
            notes,
            representativesList,
            sourcesList,
        } = this.props;

        const {
            areChildEntitiesLoaded,
            isModalOpen,
            leadOnPage,
        } = this.state;

        if (!areChildEntitiesLoaded) {
            return (<div>Loading...</div>);
        }

        const tabPages = [
            {
                label: 'Details',
                content:
                    (<LeadDetailsForm
                        handleInputChange={this.handleInputChange}
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
                        cardContents={notes.toList()}
                    />),
            },
        ];

        return (
            <div>
                <PageHeaderToolbar
                    handleBackTouchTap={this.handleBackTouchTap}
                    handleSaveTouchTap={this.handleSaveTouchTap}
                    headerText={lead.leadName}
                    subheaderText={lead.status}
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
        changes: state.changes,
        lead: leadOnPage,
        notes: state.notes,
        representativesList: state.settings.get('representatives').getData(),
        sourcesList: state.settings.get('sources').getData(),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        createLead,
        getAllChanges,
        getAllNotes,
        updateLead,
    }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
