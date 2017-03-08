/* @flow */

// TODO: Split Manage Lead into multiple components, it's getting too big.

/* External dependencies */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { List } from 'immutable';

/* Internal dependencies */
import { createLead, updateLead } from 'state/entities/leads/actions';
import Lead, { Change, Note } from 'state/entities/leads/model';
import Timeline from 'components/timeline';
import LeadDetailsForm from './details-form';
import MessagesDialog from './messages-dialog';
import CardList from 'components/card-list';
import PageHeaderToolbar from './page-header-toolbar';
import TabsToolbar from 'components/tabs-toolbar';

/* Types */
import type { Map } from 'immutable';
import type { MapLocation } from 'lib/types';

const mapStateToProps = (state, ownProps) => {
    const entitiesPath = ['entities', 'leads', 'entities'];
    let lead = new Lead();
    let notes = new List();
    let changes = new List();
    const leadId = parseInt(ownProps.params.id, 10) || 0;
    if (leadId !== 0) {
        lead = state.getIn(entitiesPath.concat(['leads', leadId.toString()]));
        notes = state.getIn(entitiesPath.concat(['notes']))
            .filter(note => note.leadId === leadId)
            .toList();
        changes = state.getIn(entitiesPath.concat(['changes']))
            .filter(change => change.leadId === leadId)
            .toList();
    }
    return {
        changes,
        lead,
        notes,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        createLead,
        updateLead,
    }, dispatch),
});

class ManageLeadPage extends React.Component {
    props: {
        actions: any,
        changes: List<Change>,
        lead: Lead,
        notes: List<Note>,
    };

    state: {
        isMessagesDialogOpen: boolean,
        lead: Lead,
    };

    constructor(props: any): void {
        super(props);
        this.state = {
            isMessagesDialogOpen: false,
            lead: this.props.lead,
        };
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
        const { lead } = this.state;
        const updatedLead = lead.set(nameOfField, newValue);
        this.setState({ lead: updatedLead });
    };

    /**
     * Updates the address, latitude, and longitude of the Lead held in local
     *      state when the Places Autocomplete input is changed on the
     *      Details Form.
     * @param {MapLocation} newLocation New location to apply to the Lead.
     */
    handleLocationChange = (newLocation: MapLocation): void => {
        const { lead } = this.state;
        const { address, lat, lng } = newLocation;
        const updatedLead = lead.merge({ address, lat, lng });
        this.setState({ lead: updatedLead });
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

        // If the ID is 0 (the default), a new Lead needs to be created,
        // otherwise update the Lead that corresponds with the ID.
        const { lead } = this.state;
        let performAction: Function = this.props.actions.createLead;
        if (lead.id !== 0) {
            performAction = this.props.actions.updateLead;
        }
        performAction(lead).then(() => browserHistory.push('/leads'));
    };

    render(): React.Element<*> {
        const {
            changes,
            notes,
        } = this.props;

        const {
            isMessagesDialogOpen,
            lead,
        } = this.state;

        const tabPages = [
            {
                label: 'Details',
                content:
                    (<LeadDetailsForm
                        handleInputChange={this.handleInputChange}
                        handleLocationChange={this.handleLocationChange}
                        lead={lead}
                    />),
            },
            {
                label: 'History',
                content: (<Timeline timelineEvents={changes} />),
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
                    headerText={lead.leadName}
                    subheaderText={lead.status}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
