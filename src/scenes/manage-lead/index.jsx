/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* Internal dependencies */
import { createLead, updateLead } from 'state/entities/leads/actions';
import Lead from 'state/entities/leads/model';
import ChangesTimeline from './changes-timeline';
import ConfirmationDialog from 'components/confirmation-dialog';
import LeadDetailsForm from './details-form';
import MessagesDialog from './messages-dialog';
import MessagesList from './messages-list';
import NotesList from './notes-list';
import PageHeaderToolbar from './page-header-toolbar';
import TabsPage from 'components/tabs-page';

const mapStateToProps = (state, ownProps) => {
    let lead = new Lead();
    const leadId = ownProps.params.id || '0';
    if (leadId !== '0') {
        lead = state.getIn(['entities', 'leads', 'byId', leadId]);
    }
    return {
        lead,
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    createLead: lead => dispatch(createLead(lead)),
    updateLead: lead => dispatch(updateLead(lead)),
});

/**
 * Top level container for managing single Lead entities.
 * @export
 * @class ManageLeadPage
 */
export class ManageLeadPage extends React.Component {
    props: {
        createLead: () => void,
        lead: Lead,
        updateLead: () => void,
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
        const createLeadPromise: Function = this.props.createLead;
        const updateLeadPromise: Function = this.props.updateLead;

        // If the ID is 0 (the default), a new Lead needs to be created,
        // otherwise update the Lead that corresponds with the ID.
        let performActionPromise: Function = createLeadPromise;
        if (lead.id !== 0) {
            performActionPromise = updateLeadPromise;
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

    /**
     * Updates the local state to ensure the Add button for new notes is
     *      hidden if the active tab isn't on the Notes page.
     * @param {string} value Value (name) of the active tab.
     */
    handleTabPageChange = (value: string): void => {
        this.setState({ activeTabName: value });
    };

    render(): React.Element<*> {
        const { lead } = this.props;
        const {
            activeTabName,
            isConfirmationDialogOpen,
            isMessagesDialogOpen,
        } = this.state;

        let tabPagesToShow = [
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
                content: (
                    <NotesList
                        showAddButton={activeTabName === 'notes'}
                        lead={lead}
                    />
                ),
                label: 'Notes',
                value: 'notes',
            },
        ];
        if (lead.id !== 0) {
            tabPagesToShow = tabPagesToShow.concat([
                {
                    content: (<ChangesTimeline lead={lead} />),
                    label: 'History',
                    value: 'history',
                },
                {
                    content: (
                        <MessagesList
                            showAddButton={activeTabName === 'messages'}
                            lead={lead}
                        />
                    ),
                    label: 'Messages',
                    value: 'messages',
                },
            ]);
        }

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
                    tabPages={tabPagesToShow}
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
