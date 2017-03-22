/* @flow */

/* External dependencies */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { List } from 'immutable';

/* Internal dependencies */
import * as leadActions from 'state/entities/leads/actions';
import { Change, Lead, Note } from 'state/entities/models';
import ConfirmationDialog from 'components/confirmation-dialog';
import LeadDetailsForm from './details-form';
import MessagesDialog from './messages-dialog';
import NotesList from './notes-list';
import PageHeaderToolbar from './page-header-toolbar';
import TabsPage from 'components/tabs-page';
import Timeline from 'components/timeline';

const mapStateToProps = (state, ownProps) => {
    const leadEntities = state.getIn(['entities', 'leads', 'entities']);
    let lead = new Lead();
    let changes = new List();
    let notes = new List();
    const leadId = ownProps.params.id || '0';
    if (leadId !== '0') {
        lead = leadEntities.getIn(['leads', leadId]);
        changes = lead.getChildrenFromState(leadEntities, 'changes');
        notes = lead.getChildrenFromState(leadEntities, 'notes');
    }
    return {
        changes,
        lead,
        notes,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(leadActions, dispatch),
});

/**
 * Top level container for managing single Lead entities.
 * @export
 * @class ManageLeadPage
 */
export class ManageLeadPage extends React.Component {
    props: {
        actions: Object,
        changes: List<Change>,
        lead: Lead,
        notes: List<Note>,
    };

    state: {
        activeTabName: string,
        isConfirmationDialogOpen: boolean,
        isMessagesDialogOpen: boolean,
    };

    constructor(): void {
        super();
        this.state = {
            activeTabName: 'details',
            isConfirmationDialogOpen: false,
            isMessagesDialogOpen: false,
        };
    }

    /**
     * If the back button in the page header toolbar is pressed, confirm the
     *      user wants to exit the page if changes were made.
     * @param {Event} event Event associated with the control.
     */
    handleBackArrowTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: true });
    };

    /**
     * If the user does not wish to lose their changes, hide the dialog.
     * @param {Event} event Event associated with the control.
     */
    handleConfirmationNoTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
    };

    /**
     * If the user confirms that they want to exit the page, redirect to the
     *      Leads List.
     * @param {Event} event Event associated with the control.
     */
    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
        browserHistory.push('/leads');
    };

    /**
     * Updates the Lead entity in local state and opens the Messages dialog
     *      when the Save button is pressed.
     * @param {Event} event Event associated with the Save button.
     * @param {Lead} lead Lead being edited on the page.
     */
    handleSaveTouchTap = (event: Event, lead: Lead): void => {
        event.preventDefault();
        const { createLead, updateLead } = this.props.actions;

        // If the ID is 0 (the default), a new Lead needs to be created,
        // otherwise update the Lead that corresponds with the ID.
        let performActionPromise: Function = createLead;
        if (lead.id !== 0) {
            performActionPromise = updateLead;
        }
        performActionPromise(lead).then(() => {
            this.setState({ isMessagesDialogOpen: true });
        });
    };

    /**
     * Hides the Message creation dialog box regardless of the action that was
     *      performed.
     * @param {Event} event Event associated with the button pressed.
     */
    handleMessageDialogTouchTap = (event: Event) => {
        event.preventDefault();
        this.setState({ isMessagesDialogOpen: false });
    };

    handleNoteListDelete = (id: number): void => {
        const { actions, lead } = this.props;
        const { deleteItemInLead } = (actions: Object);
        console.log(this.props.notes);
        deleteItemInLead(lead.id, 'notes', id).then(() => {
            console.log(this.props.notes);
        });
    };

    handleNoteListUpdate = (note: Note): void => {

    };

    /**
     * Updates the local state to ensure the Add button for new notes is
     *      hidden if the active tab isn't on the Notes page.
     * @param {string} value Value (name) of the active tab.
     */
    handleTabPageChange = (value: string): void => {
        this.setState({ activeTabName: value });
    };

    render(): React.Element<*> {
        const { changes, lead, notes } = this.props;
        const {
            activeTabName,
            isConfirmationDialogOpen,
            isMessagesDialogOpen,
        } = this.state;

        const confirmationMessage =
            'If you go back without pressing save, your changes will be ' +
            'lost, do you wish to continue?';
        return (
            <div>
                <PageHeaderToolbar
                    handleBackArrowTouchTap={this.handleBackArrowTouchTap}
                    headerText={lead.leadName}
                    subheaderText={lead.status}
                />
                <TabsPage
                    handleTabPageChange={this.handleTabPageChange}
                    paperStyle={{ minHeight: 620 }}
                    tabPages={[
                        {
                            content: (
                                <LeadDetailsForm
                                    handleSaveTouchTap={this.handleSaveTouchTap}
                                    lead={lead}
                                />
                            ),
                            label: 'Details',
                            value: 'details',
                        },
                        {
                            content: (<Timeline timelineEvents={changes} />),
                            label: 'History',
                            value: 'history',
                        },
                        {
                            content: (
                                <NotesList
                                    handleNoteDelete={this.handleNoteListDelete}
                                    handleNoteUpdate={this.handleNoteListUpdate}
                                    isAddButtonShown={activeTabName === 'notes'}
                                    notes={notes}
                                />
                            ),
                            label: 'Notes',
                            value: 'notes',
                        },
                    ]}
                />
                <MessagesDialog
                    handleTouchTap={this.handleMessageDialogTouchTap}
                    lead={lead}
                    open={isMessagesDialogOpen}
                />
                <ConfirmationDialog
                    handleNoTouchTap={this.handleConfirmationNoTouchTap}
                    handleYesTouchTap={this.handleConfirmationYesTouchTap}
                    message={confirmationMessage}
                    open={isConfirmationDialogOpen}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
