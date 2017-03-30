/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
    Card,
    CardHeader,
    CardTitle,
    CardText,
} from 'material-ui/Card';
import { List as MuiList } from 'material-ui/List';

/* Internal dependencies */
import { createMessage } from 'state/entities/messages/actions';
import { selectMessagesInLead } from 'state/entities/messages/selectors';
import { Lead, Message } from 'state/entities/models';
import ActionButton from 'components/action-button';
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
        isMessageDialogOpen: boolean,
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

    render(): React.Element<*> {
        const { lead, messages, showAddButton } = this.props;
        const { isMessageDialogOpen } = this.state;

        let messagesInLead = new List();
        if (messages) {
            messagesInLead = messages;
        }

        return (
            <div>
                <MuiList>
                    {messagesInLead.map(message => (
                        <Card
                            key={message.id}
                            style={{ margin: 16 }}
                        >
                            <CardHeader
                                subtitle={message.createdAt}
                                title={message.createdBy}
                            />
                            <CardTitle title={message.subject} />
                            <CardText>
                                {message.body}
                            </CardText>
                        </Card>
                    ))}
                </MuiList>
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
                    redirectToLeads={false}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessagesList);
