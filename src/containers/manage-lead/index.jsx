/* @flow */

// TODO: Split Manage Lead into multiple components, it's getting too big.

/* External dependencies */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* Internal dependencies */
import { getAllChanges } from 'state/changes/actions';
import { createLead, updateLead } from 'state/leads/actions';
import { getAllNotes } from 'state/notes/actions';
import Change from 'state/changes/model';
import Lead from 'state/leads/model';
import Note from 'state/notes/model';
import Timeline from 'components/timeline';
import LeadDetailsForm from './details-form';
import MessagesDialog from './messages-dialog';
import CardList from 'components/card-list';
import PageHeaderToolbar from './page-header-toolbar';
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
        isMessagesDialogOpen: boolean,
        leadOnPage: Object,
    };

    constructor(props: any): void {
        super(props);

        this.state = {
            areChildEntitiesLoaded: false,
            isMessagesDialogOpen: false,
            leadOnPage: this.props.lead,
        };
    }

    // TODO: Add comments to this method.
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
     * Performs an action based on the button pressed in the page header
     *      toolbar.  If the Back button was pressed, return to the Leads List
     *      page, otherwise open the Messages Dialog.
     * @param {Event} event Event associated with the control.
     * @param {string} actionName Name of action associated with touch-tapped
     *      element.
     */
    handleHeaderTouchTap = (event: Event, actionName: string): void => {
        event.preventDefault();
        if (actionName === 'save') {
            this.setState({ isMessagesDialogOpen: true });
        } else {
            browserHistory.push('/leads');
        }
    };

    /**
     * Updates the Lead held in local state with the data from the field on the
     *      Details Form component.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue
     * @param {string} fieldName
     */
    handleInputChange = (event: Event, newValue: string,
                         fieldName?: string = ''): void => {
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
     * @param {MapLocation} newLocation New location to apply to the Lead.
     */
    handleLocationChange = (newLocation: MapLocation): void => {
        const { leadOnPage } = this.state;
        const { address, lat, lng } = newLocation;
        const updatedLead = leadOnPage.merge({ address, lat, lng });
        this.setState({ leadOnPage: updatedLead });
    };

    /**
     * Updates existing Lead or creates a new Lead based on the ID of the Lead
     *      held in local state.
     * @param {Event} event Event associated with the button pressed.
     */
    handleModalTouchTap = (event: Event): void => {
        event.preventDefault();

        // Ensure the Messages dialog closes before the save/update action is
        // performed.
        this.setState({ isMessagesDialogOpen: false });

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

    render(): React.Element<*> {
        const {
            changes,
            lead,
            notes,
            representativesList,
            sourcesList,
        } = this.props;

        const {
            areChildEntitiesLoaded,
            isMessagesDialogOpen,
            leadOnPage,
        } = this.state;

        if (!areChildEntitiesLoaded) {
            return (<div>Loading...</div>);
        }

        const tabPages: React.Element<*> = [
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
                content: (<Timeline changes={changes} />),
            },
            {
                label: 'Notes',
                content:
                    (<CardList cardContents={notes} />),
            },
        ];

        return (
            <div>
                <PageHeaderToolbar
                    handleTouchTap={this.handleHeaderTouchTap}
                    headerText={leadOnPage.leadName}
                    subheaderText={leadOnPage.status}
                />
                <TabsToolbar
                    tabPages={tabPages}
                />
                <MessagesDialog
                    handleTouchTap={this.handleModalTouchTap}
                    isOpen={isMessagesDialogOpen}
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
