/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { List } from 'immutable';

/* Internal dependencies */
import { createLead, updateLead } from 'state/entities/leads/actions';
import { Change, Lead } from 'state/entities/models';
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
    let changes = new List();
    const leadId = parseInt(ownProps.params.id, 10) || 0;
    if (leadId !== 0) {
        lead = state.getIn(entitiesPath.concat([leadId.toString()]));
        changes = lead.get('changes').toList();
    }
    return {
        changes,
        lead,
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
        updateLead: () => void,
    };

    state: {
        activeTabName: string,
        isMessagesDialogOpen: boolean,
        lead: Lead,
    };

    constructor(props: any): void {
        super(props);
        this.state = {
            activeTabName: 'details',
            isMessagesDialogOpen: false,
            lead: this.props.lead,
        };
    }

    /**
     * If the back button in the page header toolbar is pressed, redirects the
     *      user back to the Leads List page after confirming the action.
     * @param {Event} event Event associated with the control.
     */
    handleBackArrowTouchTap = (event: Event): void => {
        event.preventDefault();
        // TODO: Add confirmation prior to going back to Leads List.
        browserHistory.push('/leads');
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

    handleSaveTouchTap = (event: Event, lead: Lead): void => {
        event.preventDefault();
        this.setState({
            isMessagesDialogOpen: true,
            lead,
        });
    };

    handleTabPageChange = (value: string): void => {
        this.setState({ activeTabName: value });
    };

    render(): React.Element<*> {
        const { changes } = this.props;
        const { activeTabName, isMessagesDialogOpen, lead } = this.state;

        return (
            <div>
                <PageHeaderToolbar
                    handleBackArrowTouchTap={this.handleBackArrowTouchTap}
                    headerText={lead.leadName}
                    subheaderText={lead.status}
                />
                <TabsToolbar
                    handleTabPageChange={this.handleTabPageChange}
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
                                    isAddButtonShown={activeTabName === 'notes'}
                                    lead={lead}
                                />
                            ),
                            label: 'Notes',
                            value: 'notes',
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
