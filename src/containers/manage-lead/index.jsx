/* @flow */

// TODO: Split Manage Lead into multiple components, it's getting too big.

/* External dependencies */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* Internal dependencies */
import { createLead, updateLead } from 'state/entities/leads/actions';
import { Change, Lead, Note } from 'state/entities/leads/model';
import Timeline from 'components/timeline';
import LeadDetailsForm from './details-form';
import MessagesDialog from './messages-dialog';
import CardList from 'components/card-list';
import PageHeaderToolbar from './page-header-toolbar';
import TabsToolbar from 'components/tabs-toolbar';

/* Types */
import type { Map } from 'immutable';
import type { MapLocation, Selection } from 'lib/types';
import type { TimelineEvent } from 'components/timeline';

const mapStateToProps = (state, ownProps) => {
    const entities = state.getIn(['entities', 'leads', 'entities']);
    let leadOnPage = new Lead();
    const leadId = parseInt(ownProps.params.id, 10) || 0;
    if (leadId !== 0) {
        leadOnPage = entities.get('leads').find(
            (value, key) => key.toString() === leadId.toString());
    }

    const getEntitiesInLead = entityGroupName =>
        entities.get(entityGroupName)
            .filter((value, key) => value.leadId === leadId)
            .map((value, key) => value.toJS())
            .toArray();

    const settings = state.get('settings');

    return {
        lead: leadOnPage,
        notes: getEntitiesInLead('notes'),
        representativesList: settings.get('representatives').getData(),
        sourcesList: settings.get('sources').getData(),
        timelineEvents: getEntitiesInLead('changes'),
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
        lead: Lead,
        notes: Map<number, Note>,
        representativesList: Array<Selection>,
        sourcesList: Array<Selection>,
        timelineEvents: Array<TimelineEvent>,
    };

    state: {
        isMessagesDialogOpen: boolean,
        leadOnPage: Lead,
    };

    constructor(props: any): void {
        super(props);
        this.state = {
            isMessagesDialogOpen: false,
            leadOnPage: this.props.lead,
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
            lead,
            notes,
            representativesList,
            sourcesList,
            timelineEvents,
        } = this.props;

        const {
            isMessagesDialogOpen,
            leadOnPage,
        } = this.state;

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
                content: (<Timeline timelineEvents={timelineEvents} />),
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
