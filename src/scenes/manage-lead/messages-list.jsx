/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import { createMessage } from 'state/entities/messages/actions';
import { selectMessagesInLead } from 'state/entities/messages/selectors';
import { Lead, Message } from 'state/entities/models';
import ActionButton from 'components/action-button';
import CardList from 'components/card-list';
import MessagesDialog from './messages-dialog';

const mapStateToProps = (state, ownProps) => ({
    messages: selectMessagesInLead(state, ownProps),
});

export class MessagesList extends React.Component {
    props: {
        showAddButton: boolean,
        lead: Lead,
        messages?: List<Message>,
    };

    state: {
        activeMessage: Message,
        isMessageDialogOpen: boolean,
    };

    constructor(): void {
        super();
        this.state = {
            activeMessage: new Message(),
            isMessageDialogOpen: false,
        };
    }

    getMessageById = messageId =>
        this.props.messages.find(message => message.id === messageId);

    handleAddButtonTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({
            activeMessage: new Message(),
            isMessageDialogOpen: true,
        });
    };

    handleCardEditTouchTap = (event: Event, cardEntity: Object): void => {
        event.preventDefault();
        const activeMessage = this.getMessageById(cardEntity.id);
        console.log(activeMessage);
        this.setState({
            activeMessage,
            editDialogTitle: 'Edit Message',
            isMessageDialogOpen: true,
        });
    };

    render(): React.Element<*> {
        const { showAddButton, lead, messages } = this.props;
        const {
            activeMessage,
            isMessageDialogOpen,
        } = this.state;

        return (
            <div>
                <CardList
                    cardContents={messages}
                    handleDeleteTouchTap={this.handleCardDeleteTouchTap}
                    handleEditTouchTap={this.handleCardEditTouchTap}
                    searchFieldInclusions={['contents']}
                />
                {showAddButton && (
                    <ActionButton
                        handleTouchTap={this.handleAddButtonTouchTap}
                        iconName="add"
                    />
                )}
                <MessagesDialog
                    handleTouchTap=""
                    lead={lead}
                    open={isMessageDialogOpen}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessagesList);
