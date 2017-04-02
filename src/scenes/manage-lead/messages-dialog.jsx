/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

/* Internal dependencies */
import { getDedentedString } from 'lib/display-formats';
import { sendMessages } from 'state/entities/messages/actions';
import { Lead, Message } from 'state/entities/models';
import ConfirmationDialog from 'components/confirmation-dialog';
import IconDropdown from 'components/icon-dropdown';

/* Types */
type Props = {
    handleTouchTap: (event: Event) => void,
    lead: Lead,
    open: boolean,
    redirectToLeads: boolean,
    sendMessages?: (lead: Lead, messages: Array<Message>) => void,
    textTemplates?: Array<string>,
};

type State = {
    isConfirmationDialogOpen: boolean,
    messageToLead: string,
    messageToRepresentative: string,
    sendLeadMessage: boolean,
    sendRepresentativeMessage: boolean,
};

/**
 * Styled container for the message block.
 */
const MessageBlock = styled.div`
    margin: 24px 0;
`;

const LeadMessageContainer = styled.div`
    align-items: flex-end;
    display: flex;
`;

const mapStateToProps = (state, ownProps) => {
    const settings = state.getIn(['settings', 'byName']);
    return {
        lead: ownProps.lead,
        textTemplates: settings.get('textTemplates').getData(),
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    sendMessages: (lead, messages) => dispatch(sendMessages(lead, messages)),
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
export class MessagesDialog extends React.Component<*, Props, State> {
    props: Props;
    state: State;

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

    /**
     * Closes the confirmation dialog if the user presses cancel.
     * @param {Event} event Event associated with the Cancel button.
     */
    handleCancelTouchTap = (event: Event): void => {
        event.preventDefault();
        this.setState({ isConfirmationDialogOpen: true });
    };

    /**
     * Returns an array of text messages that need to get sent based on the
     *      user's selections.
     * @returns {Array} Array of messages to send.
     */
    getMessagesToSend = (): Array<Message> => {
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

    /**
     * Closes the Confirmation dialog form (if it's open), and resets all of
     *      the inputs to ensure they're not populated the next time the form
     *      is opened.
     */
    closeConfirmationDialogAndResetInputs = (): void => {
        this.setState({
            isConfirmationDialogOpen: false,
            messageToLead: '',
            messageToRepresentative: '',
            sendLeadMessage: false,
            sendRepresentativeMessage: false,
        });
    };

    /**
     * Sends the messages specified by the user, closes any dialogs, and
     *      redirects the user to the Leads List (if applicable).
     * @param {Event} event Event associated with the Submit button.
     */
    handleSubmitTouchTap = (event: Event): void => {
        event.preventDefault();
        const { handleTouchTap, lead, redirectToLeads } = this.props;
        let sendMessagesFn: Function = () => {};
        if (this.props.sendMessages) {
            sendMessagesFn = this.props.sendMessages;
        }
        const messagesToSend = this.getMessagesToSend();
        handleTouchTap(event);
        sendMessagesFn(lead, messagesToSend).then(() => {
            this.closeConfirmationDialogAndResetInputs();
            if (redirectToLeads) {
                browserHistory.push('/leads');
            }
        });
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
     * If the user confirms that they want to exit the page, redirect to the
     *      Leads List.
     * @param {Event} event Event associated with the Yes button.
     */
    handleConfirmationYesTouchTap = (event: Event): void => {
        event.preventDefault();
        const { handleTouchTap } = this.props;
        this.closeConfirmationDialogAndResetInputs();
        handleTouchTap(event);
    };

    /**
     * If the user toggles the "Send message to representative" to indicate that
     *      they want to send a message, this updates the message to send
     *      based on a predefined template.
     */
    handleToggleForRepresentativeMessage = (): void => {
        const { lead } = this.props;
        const messageTemplate =
            `You were assigned a lead!%~%
            Customer: ${lead.leadName}
            Description: ${lead.description}
            Source: ${lead.source}`;

        // Multi-line template string include any tab characters, this
        // removes them:
        const messageToRepresentative =
            getDedentedString(messageTemplate).replace(/%~%/g, '\n');
        this.setState({
            sendRepresentativeMessage: true,
            messageToRepresentative,
        });
    };

    /**
     * Updates the state with the contents of the updated input.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue New value of the input.
     */
    handleInputChange = (event: Event & {
        currentTarget: HTMLInputElement | HTMLTextAreaElement },
        newValue: string = ''): void => {
        const fieldName = event.currentTarget.name;
        if (fieldName === 'sendRepresentativeMessage' && newValue === true) {
            this.handleToggleForRepresentativeMessage();
        } else {
            this.setState({ [fieldName]: newValue });
        }
    };

    /**
     * This updates the contents of the message text field for the Lead entity
     *      if a selection is picked from the text template dropdown menu.
     * @param {Event} event Event associated with the template dropdown menu.
     * @param {Object} child Menu item selected from the dropdown menu.
     */
    handlePredefinedMessageChange = (event: Event, child: Object): void => {
        event.preventDefault();
        this.setState({ messageToLead: child.key });
    };

    /**
     * Pulls the text templates from global state and replaces any placeholders
     *      with actual values (i.e. name of lead).
     * @returns {Array} Array of text templates with custom data.
     */
    getPopulatedTextTemplates = (): Array<string> => {
        const lead: Lead = this.props.lead;
        const { textTemplates = [] } = this.props;
        return textTemplates.map((textTemplate) => {
            const { leadName, assignTo } = lead;
            return textTemplate
                .replace(/\[leadName\]/g, leadName)
                .replace(/\[assignTo\]/g, assignTo);
        });
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

        const textTemplates = this.getPopulatedTextTemplates();

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
                        <LeadMessageContainer>
                            <IconDropdown
                                disabled={!sendLeadMessage}
                                handleItemTouchTap={
                                    this.handlePredefinedMessageChange}
                                hasAddButton={false}
                                menuIconName="message"
                                selections={textTemplates}
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
                        </LeadMessageContainer>
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
