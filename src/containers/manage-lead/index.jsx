/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { List } from 'immutable';

/* Internal dependencies */
import { createLead, updateLead } from 'state/entities/leads/actions';
import { Change, Lead, Note } from 'state/entities/models';
import Timeline from 'components/timeline';
import LeadDetailsForm from './details-form';
import MessagesDialog from './messages-dialog';
import NotesList from './notes-list';
import PageHeaderToolbar from './page-header-toolbar';
import TabsToolbar from 'components/tabs-toolbar';

/* Types */
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
    dispatch,
    createLead: lead => dispatch(createLead(lead)),
    updateLead: lead => dispatch(updateLead(lead)),
});

class ManageLeadPage extends React.Component {
    props: {
        changes: List<Change>,
        createLead: () => void,
        lead: Lead,
        notes: List<Note>,
        updateLead: () => void,
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

    getUpdatedLead = (updatedLead: Lead) => {
        this.setState({ lead: updatedLead });
    };

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
        let performActionPromise: Function = this.props.createLead;
        if (lead.id !== 0) {
            performActionPromise = this.props.updateLead;
        }
        performActionPromise(lead).then(() => browserHistory.push('/leads'));
    };

    render(): React.Element<*> {
        const { changes, notes } = this.props;
        const { isMessagesDialogOpen, lead } = this.state;

        return (
            <div>
                <PageHeaderToolbar
                    handleTouchTap={this.handleHeaderTouchTap}
                    headerText={lead.leadName}
                    subheaderText={lead.status}
                />
                <TabsToolbar
                    tabPages={[
                        {
                            label: 'Details',
                            content: (
                                <LeadDetailsForm
                                    getUpdatedLead={this.getUpdatedLead}
                                    lead={lead}
                                />
                            ),
                        },
                        {
                            label: 'History',
                            content: (<Timeline timelineEvents={changes} />),
                        },
                        {
                            label: 'Notes',
                            content: (<NotesList notes={notes} />),
                        },
                    ]}
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
