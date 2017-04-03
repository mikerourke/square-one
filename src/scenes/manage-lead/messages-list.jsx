/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import { getDisplayDate } from 'lib/display-formats';
import { selectMessagesInLead } from 'state/entities/messages/selectors';
import { Lead, Message } from 'state/entities/models';
import ActionButton from 'components/action-button';
import CardList from 'components/card-list';
import MessagesDialog from './messages-dialog';

/* Types */
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

    handleAddButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isMessageDialogOpen: true });
    };

    handleDialogTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isMessageDialogOpen: false });
    };

    /**
     * Extrapolates the required properties for a card entity from the list of
     *      messages and returns a list of card entities.
     * @returns {Immutable.List}
     */
    getCardEntities = (): List<*> => {
        const messagesInLead = this.props.messages;
        let cardEntities = new List();
        if (messagesInLead) {
            cardEntities = messagesInLead
                .map((message) => {
                    const displayDate = getDisplayDate(message.createdAt);
                    return {
                        id: message.id,
                        title: message.getIn(['createdBy', 'fullName']),
                        subtitle: displayDate,
                        contents: message.body,
                    };
                })
                .sortBy(message => message.createdAt);
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
