/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* Internal dependencies */
import {
    createLead,
    deleteLead,
    updateLead,
} from 'state/entities/leads/actions';
import { selectLeads } from 'state/entities/leads/selectors';
import { Lead } from 'state/entities/models';
import ChangesTimeline from './changes-timeline';
import ConfirmationDialog from 'components/confirmation-dialog';
import LeadDetailsForm from './details-form';
import MessagesDialog from './messages-dialog';
import MessagesList from './messages-list';
import NotesList from './notes-list';
import PageHeaderToolbar from './page-header-toolbar';
import TabsPage from 'components/tabs-page';

/* Types */
type Props = {
    lead: Lead,
    createLead: (lead: Lead) => Promise<*>,
    deleteLead: (lead: Lead) => Promise<*>,
    updateLead: (lead: Lead) => Promise<*>,
};

type State = {
    activeTabName: string,
    confirmedAction: '' | 'DELETE-LEAD' | 'GO-BACK',
    confirmationMessage: string,
    isConfirmationDialogOpen: boolean,
    isMessagesDialogOpen: boolean,
    leadOnForm: Lead,
};

const mapStateToProps = (state, ownProps) => {
    let lead = new Lead();
    const leadsInState = selectLeads(state);
    const leadId = ownProps.params.id || '0';
    if (leadId !== '0') {
        lead = leadsInState.get(leadId);
    }
    return {
        lead,
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    createLead: lead => dispatch(createLead(lead)),
    deleteLead: lead => dispatch(deleteLead(lead)),
    updateLead: lead => dispatch(updateLead(lead)),
});

/**
 * Top level container for managing single Lead entities.
 * @export
 * @class ManageLeadPage
 */
export class ManageLeadPage extends React.Component<*, Props, State> {
    props: Props;
    state: State;

    constructor(props: Props): void {
        super(props);
        this.state = {
            activeTabName: 'details',
            confirmedAction: '',
            confirmationMessage: '',
            isConfirmationDialogOpen: false,
            isMessagesDialogOpen: false,
            leadOnForm: props.lead,
        };
    }

    getLeadDifferences = (): Array<Object> => {
        const { lead } = this.props;
        const { leadOnForm } = this.state;
        return lead.getDifferences(leadOnForm);
    };

    /**
     * If the back button in the page header toolbar is pressed, confirm the
     *      user wants to exit the page if changes were made.
     * @param {Event} event Event associated with the Back arrow button.
     */
    handleBackArrowTouchTap = (event: Event): void => {
        event.preventDefault();
        const leadDifferences = this.getLeadDifferences();
        if (leadDifferences.length > 0) {
            const confirmationMessage =
                'If you go back without pressing save, your changes will be ' +
                'lost, do you wish to continue?';
            this.setState({
                confirmedAction: 'GO-BACK',
                confirmationMessage,
                isConfirmationDialogOpen: true,
            });
        } else {
            browserHistory.push('/leads');
        }
    };

    /**
     * If the user does not wish to lose their changes, hide the dialog.
     * @param {Event} event Event associated with the No button.
     */
    handleConfirmationNoTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: false });
    };

    /**
     * Closes the Confirmation Dialog and redirects the user to the Leads List
     *      page.
     */
    closeConfirmationAndRedirectToLeads = (): void => {
        this.setState({ isConfirmationDialogOpen: false });
        browserHistory.push('/leads');
    };

    /**
     * If the user confirms that they want to exit the page or delete the Lead,
     *      the Lead is deleted (if applicable) and the user is redirected to
     *      the Leads List.
     * @param {Event} event Event associated with the Yes button.
     */
    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        const { lead } = this.props;
        const { confirmedAction } = this.state;

        if (confirmedAction === 'DELETE-LEAD') {
            const deleteLeadFn: Function = this.props.deleteLead;
            deleteLeadFn(lead).then(() => {
                this.closeConfirmationAndRedirectToLeads();
            });
        } else {
            this.closeConfirmationAndRedirectToLeads();
        }
    };

    /**
     * Prompts the user with a confirmation if they want to delete the active
     *      Lead when the Delete button on the details form is pressed.
     * @param {Event} event Event associated with the Delete button.
     */
    handleDeleteButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        const confirmationMessage =
            'Deleting a lead cannot be undone, do you wish to continue?';
        this.setState({
            confirmedAction: 'DELETE-LEAD',
            confirmationMessage,
            isConfirmationDialogOpen: true,
        });
    };

    /**
     * Updates the Lead in local state from the form when a change is made
     *      on the form.
     * @param {Lead} lead Lead on the details form.
     */
    handleFormFieldChange = (lead: Lead): void => {
        this.setState({ leadOnForm: lead });
    };

    /**
     * Updates the Lead entity opens the Messages dialog when the Save button
     *      on the details form is pressed.
     * @param {Event} event Event associated with the Save button.
     * @param {Lead} lead Lead being edited on the page.
     */
    handleSaveButtonTouchTap = (event: Event, lead: Lead): void => {
        event.preventDefault();
        const createLeadFn: Function = this.props.createLead;
        const updateLeadFn: Function = this.props.updateLead;

        // If the ID is 0 (the default), a new Lead needs to be created,
        // otherwise update the Lead that corresponds with the ID.
        let performActionFn: Function = createLeadFn;
        if (lead.id !== 0) {
            performActionFn = updateLeadFn;
        }
        performActionFn(lead).then(() => {
            // TODO: Add function to update ID in URL.
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
            confirmationMessage,
            isConfirmationDialogOpen,
            isMessagesDialogOpen,
            leadOnForm,
        } = this.state;

        let tabPagesToShow = [
            {
                content: (
                    <LeadDetailsForm
                        handleDeleteTouchTap={this.handleDeleteButtonTouchTap}
                        handleFieldChange={this.handleFormFieldChange}
                        handleSaveTouchTap={this.handleSaveButtonTouchTap}
                        lead={lead}
                    />
                ),
                label: 'Details',
                value: 'details',
            },
            {
                content: (
                    <NotesList
                        lead={lead}
                        showAddButton={activeTabName === 'notes'}
                    />
                ),
                label: 'Notes',
                value: 'notes',
            },
        ];
        if (lead.id !== 0) {
            tabPagesToShow = tabPagesToShow.concat([
                {
                    content: (
                        <MessagesList
                            lead={lead}
                            showAddButton={activeTabName === 'messages'}
                        />
                    ),
                    label: 'Messages',
                    value: 'messages',
                },
                {
                    content: (<ChangesTimeline lead={lead} />),
                    label: 'History',
                    value: 'history',
                },
            ]);
        }

        return (
            <div>
                <PageHeaderToolbar
                    handleBackArrowTouchTap={this.handleBackArrowTouchTap}
                    headerText={leadOnForm.leadName}
                    subheaderText={leadOnForm.status}
                />
                <TabsPage
                    handleTabPageChange={this.handleTabPageChange}
                    paperStyle={{ minHeight: 620 }}
                    tabPages={tabPagesToShow}
                />
                <MessagesDialog
                    handleTouchTap={this.handleMessageDialogTouchTap}
                    lead={leadOnForm}
                    open={isMessagesDialogOpen}
                    redirectToLeads={true}
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
