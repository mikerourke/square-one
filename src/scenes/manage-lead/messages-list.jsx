/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
    Card,
    CardHeader,
    CardText,
} from 'material-ui/Card';
import { List as MuiList } from 'material-ui/List';

/* Internal dependencies */
import { getDisplayDate } from 'lib/display-formats';
import { selectMessagesInLead } from 'state/entities/messages/selectors';
import { Lead, Message } from 'state/entities/models';
import ActionButton from 'components/action-button';
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

    render(): React.Element<*> {
        const { lead, messages, showAddButton } = this.props;
        const { isMessageDialogOpen } = this.state;

        let messagesInLead = new List();
        if (messages) {
            messagesInLead = messages.sortBy(message => message.createdAt);
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
                                subtitle={getDisplayDate(message.createdAt)}
                                title={message.getIn(['createdBy', 'fullName'])}
                            />
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
