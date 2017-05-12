/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import { getDisplayDate } from 'lib/display-formats';
import { selectMessagesInLead } from 'state/entities/messages/selectors';
import { Lead, Message } from 'state/entities/models';
import CardList from 'components/card-list';
import MessagesDialog from '../messages-dialog/index';

/* Types */
import type { CardEntity } from 'components/card-list';

type DefaultProps = {
    messages: List<Message>,
};

type Props = {
    lead: Lead,
    messages?: List<Message>,
    showAddButton: boolean,
};

type State = {
    isMessageDialogOpen: boolean,
};

const mapStateToProps = (state, ownProps) => ({
    messages: selectMessagesInLead(state, ownProps),
});

/**
 * Searchable list of messages associated with a Lead with functionality to
 *    allow for sending new messages.
 * @param {Lead} lead Parent Lead entity associated with the messages.
 * @param {boolean} showAddBoolean Indicates if the Add button should be shown.
 * @export
 * @class MessagesList
 */
export class MessagesList extends Component<DefaultProps, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        messages: new List(),
    };

    constructor(): void {
        super();
        this.state = {
            isMessageDialogOpen: false,
        };
    }

    /**
     * Show the messages dialog form when the Add button is pressed.
     */
    handleAddButtonTouchTap = (): void => {
        this.setState({ isMessageDialogOpen: true });
    };

    /**
     * Hide the messages dialog when an action is performed.
     */
    handleDialogTouchTap = (): void => {
        this.setState({ isMessageDialogOpen: false });
    };

    /**
     * Extrapolates the required properties for a card entity from the list of
     *    messages and returns a list of card entities.
     * @returns {Immutable.List}
     */
    getCardEntities = (): List<CardEntity> => {
        const messagesInLead = this.props.messages;
        let cardEntities = new List();
        if (messagesInLead) {
            cardEntities = messagesInLead
                .sortBy(message => message.createdAt)
                .reverse()
                .map((message) => {
                    const displayDate = getDisplayDate(message.createdAt);
                    return {
                        id: message.id,
                        title: message.getIn(['createdBy', 'fullName']),
                        subtitle: displayDate,
                        contents: message.body,
                    };
                });
        }
        return cardEntities;
    };

    render(): React.Element<*> {
        const { lead, showAddButton } = this.props;
        const { isMessageDialogOpen } = this.state;

        return (
            <div>
                <CardList
                    cardEntities={this.getCardEntities()}
                    handleAddTouchTap={this.handleAddButtonTouchTap}
                    hasActions={false}
                    multipleCardsPerRow={false}
                    searchFieldInclusions={['body']}
                    showAddButton={showAddButton}
                />
                <MessagesDialog
                    handleTouchTap={this.handleDialogTouchTap}
                    lead={lead}
                    open={isMessageDialogOpen}
                    redirectToLeads={false}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessagesList);
