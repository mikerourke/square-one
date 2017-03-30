/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { List } from 'immutable';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

/* Internal dependencies */
import {
    createMultipleMessages,
    createSingleMessage,
} from 'state/entities/messages/actions';
import { Lead, Message } from 'state/entities/models';
import ConfirmationDialog from 'components/confirmation-dialog';

/**
 * Styled container for the message block.
 */
const MessageBlock = styled.div`
    margin: 24px 0;
`;

const mapStateToProps = (state, ownProps) => ({
    lead: ownProps.lead,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    createMultipleMessages: (lead, messages) =>
        dispatch(createMultipleMessages(lead, messages)),
    createSingleMessage: (lead, message) =>
        dispatch(createSingleMessage(lead, message)),
});

/**
 * Modal dialog for specifying messages that get sent to Leads and
 *      Representatives.
 * @param {Function} handleTouchTap Action to perform when any button on the
 *      dialog is pressed.
 * @param {boolean} open Indicates if the dialog is open.
 * @param {boolean} redirectToLeads Indicates if browser is redirected to the
 *      Leads List page after submitting.
 */
export class MessagesDialog extends React.Component {
    props: {
        createMultipleMessages?: ?(lead: Lead, messages: List<Message>) => void,
        createSingleMessage?: ?(lead: Lead, message: Message) => void,
        handleTouchTap: (event: Event) => void,
        lead: Lead,
        open: boolean,
        redirectToLeads: boolean,
    };

    state: {
        isConfirmationDialogOpen: boolean,
        messageToLead: string,
        messageToRepresentative: string,
        sendLeadMessage: boolean,
        sendRepresentativeMessage: boolean,
    };

    constructor(): void {
        super();
        this.state = {
            isConfirmationDialogOpen: false,
            messageToLead: '',
            messageToRepresentative: '',
            sendLeadMessage: false,
            sendRepresentativeMessage: false,
        };
    }

    handleCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: true });
    };

    getMessagesToSend = () => {
        const {
            messageToLead,
            messageToRepresentative,
            sendLeadMessage,
            sendRepresentativeMessage,
        } = this.state;

        const messagesToSend = [];

        if (sendLeadMessage) {
            messagesToSend.push(new Message({
                body: messageToLead,
                messageType: 'text',
                recipient: '',
                subject: 'Message to Lead',
            }));
        }

        if (sendRepresentativeMessage) {
            messagesToSend.push(new Message({
                body: messageToRepresentative,
                messageType: 'text',
                recipient: '',
                subject: 'Message to Representative',
            }));
        }

        return messagesToSend;
    };

    // TODO: Add handler for multiple message sending.
    handleSubmitTouchTap = (event: Event): void => {
        event.preventDefault();
        const { handleTouchTap, lead, redirectToLeads } = this.props;
        const messagesToSend = this.getMessagesToSend();

        let createMessagePromise: any = () => {};
        let messagePayload;

        switch (messagesToSend.length) {
            case 1:
                createMessagePromise = this.props.createSingleMessage;
                messagePayload = messagesToSend[0];
                break;

            case 2:
                createMessagePromise = this.props.createMultipleMessages;
                messagePayload = new List(messagesToSend);
                break;

            default:
                break;
        }

        handleTouchTap(event);
        createMessagePromise(lead, messagePayload).then(() => {
            this.setState({
                isConfirmationDialogOpen: false,
                messageToLead: '',
                messageToRepresentative: '',
                sendLeadMessage: false,
                sendRepresentativeMessage: false,
            });
            if (redirectToLeads) {
                browserHistory.push('/leads');
            }
        });
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
        const { handleTouchTap } = this.props;
        this.setState({ isConfirmationDialogOpen: false });
        handleTouchTap(event);
    };

    /**
     * Updates the state with the contents of the updated input.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue New value of the input.
     */
    handleInputChange = (event: Event, newValue: string = ''): void => {
        const target = event.target;

        // The element type is checked to conform with Flow type checking.
        if (target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement) {
            this.setState({
                [target.name]: newValue,
            });
        }
    };

    render(): React.Element<*> {
        const { open } = this.props;

        const {
            isConfirmationDialogOpen,
            messageToLead,
            messageToRepresentative,
            sendLeadMessage,
            sendRepresentativeMessage,
        } = this.state;

        const actions = [
            <FlatButton
                label="Submit"
                name="submit"
                primary={true}
                onTouchTap={this.handleSubmitTouchTap}
            />,
            <FlatButton
                label="Cancel"
                name="cancel"
                secondary={true}
                onTouchTap={this.handleCancelTouchTap}
            />,
        ];

        return (
            <div>
                <Dialog
                    actions={actions}
                    autoScrollBodyContent={true}
                    bodyStyle={{
                        minHeight: 300,
                        padding: '0 24px',
                    }}
                    contentStyle={{
                        minWidth: 300,
                        width: '75%',
                    }}
                    modal={true}
                    open={open}
                    title="Messages"
                >
                    <MessageBlock>
                        <Toggle
                            label="Send message to lead"
                            name="sendLeadMessage"
                            onToggle={this.handleInputChange}
                            style={{ width: 300 }}
                        />
                        <TextField
                            disabled={!sendLeadMessage}
                            floatingLabelText="Message to Lead"
                            fullWidth={true}
                            multiLine={true}
                            name="messageToLead"
                            onChange={this.handleInputChange}
                            value={messageToLead}
                        />
                    </MessageBlock>
                    <MessageBlock>
                        <Toggle
                            label="Send message to representative"
                            name="sendRepresentativeMessage"
                            onToggle={this.handleInputChange}
                            style={{ width: 300 }}
                        />
                        <TextField
                            disabled={!sendRepresentativeMessage}
                            floatingLabelText="Message to Representative"
                            fullWidth={true}
                            multiLine={true}
                            name="messageToRepresentative"
                            onChange={this.handleInputChange}
                            value={messageToRepresentative}
                        />
                    </MessageBlock>
                </Dialog>
                <ConfirmationDialog
                    handleNoTouchTap={this.handleConfirmationNoTouchTap}
                    handleYesTouchTap={this.handleConfirmationYesTouchTap}
                    message="Are you sure you wish to cancel?"
                    open={isConfirmationDialogOpen}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesDialog);
