/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import glamorous from 'glamorous';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

/* Internal dependencies */
import { getDedentedString } from 'lib/display-formats';
import { selectListSettings } from 'state/settings/selectors';
import { sendMessages } from 'state/entities/messages/actions';
import { Lead, Message } from 'state/entities/models';
import ConfirmationDialog from 'components/confirmation-dialog';
import IconDropdown from 'components/icon-dropdown';

/* Types */
type DefaultProps = {
  sendMessages: (lead: Lead, messages: Array<Message>) => Promise<*>,
  textTemplates: Array<string>,
};

type Props = {
  handleTouchTap: () => void,
  lead: Lead,
  open: boolean,
  redirectToLeads: boolean,
  sendMessages?: (lead: Lead, messages: Array<Message>) => Promise<*>,
  textTemplates?: Array<string>,
};

type State = {
  isConfirmationDialogOpen: boolean,
  messageToLead: string,
  messageToRepresentative: string,
  sendLeadMessage: boolean,
  sendRepresentativeMessage: boolean,
};

const mapStateToProps = (state, ownProps) => ({
  lead: ownProps.lead,
  textTemplates: selectListSettings(state).textTemplates,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  sendMessages: (lead, messages) => dispatch(
    sendMessages(lead, messages)),
});

/**
 * Modal dialog for specifying messages that get sent to Leads and
 *    Representatives.
 * @param {Function} handleTouchTap Action to perform when any button on the
 *    dialog is pressed.
 * @param {boolean} open Indicates if the dialog is open.
 * @param {boolean} redirectToLeads Indicates if browser is redirected to the
 *    Leads List page after submitting.
 */
export class MessagesDialog extends Component<DefaultProps, Props, State> {
  props: Props;
  state: State;

  static defaultProps = {
    sendMessages: () => Promise.resolve(),
    textTemplates: [],
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

  /**
   * Closes the confirmation dialog if the user presses cancel.
   */
  handleCancelTouchTap = (): void => {
    this.setState({ isConfirmationDialogOpen: true });
  };

  /**
   * Returns an array of text messages that need to get sent based on the
   *    user's selections.
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

    // TODO: Update recipient for messages.

    if (sendLeadMessage) {
      messagesToSend.push(new Message({
        body: messageToLead,
        messageType: 'text',
        recipient: process.env.MY_PHONE_NUMBER,
        subject: 'Message to Lead',
      }));
    }

    if (sendRepresentativeMessage) {
      messagesToSend.push(new Message({
        body: messageToRepresentative,
        messageType: 'text',
        recipient: process.env.MY_PHONE_NUMBER,
        subject: 'Message to Representative',
      }));
    }

    return messagesToSend;
  };

  /**
   * Closes the Confirmation dialog form (if it's open), and resets all of
   *    the inputs to ensure they're not populated the next time the form
   *    is opened.
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
   * If messages were specified, dispatch the sendMessages action and return
   *    the resolved Promise.  If no messages were specified return a
   *    resolved Promise to continue processing.
   * @returns {Promise}
   */
  sendMessagesIfRequired = (): Promise<*> =>
    new Promise((resolve, reject) => {
      const { lead } = this.props;
      let sendMessagesFn = () => Promise.resolve();
      if (this.props.sendMessages) {
        sendMessagesFn = this.props.sendMessages;
      }
      const messagesToSend = this.getMessagesToSend();
      if (messagesToSend.length === 0) {
        resolve();
      } else {
        sendMessagesFn(lead, messagesToSend)
          .then(() => resolve())
          .catch(error => reject(error));
      }
    });

  /**
   * Sends the messages specified by the user, closes any dialogs, and
   *    redirects the user to the Leads List (if applicable).
   */
  handleSubmitTouchTap = (): void => {
    const {
      handleTouchTap,
      redirectToLeads,
    } = this.props;

    // Hide the messages dialog form.
    handleTouchTap();

    // Since messages are optional, the same actions need to be performed
    // regardless of whether messages are sent.
    this.sendMessagesIfRequired()
      .then(() => {
        this.closeConfirmationDialogAndResetInputs();
        if (redirectToLeads) {
          browserHistory.push('/leads');
        }
      })
      .catch(error => console.error(error)); // TODO: Add alert message.
  };

  /**
   * If the user does not wish to lose their changes, hide the dialog.
   */
  handleConfirmationNoTouchTap = (): void => {
    this.setState({ isConfirmationDialogOpen: false });
  };

  /**
   * If the user confirms that they want to exit the page, redirect to the
   *    Leads List.
   */
  handleConfirmationYesTouchTap = (): void => {
    const { handleTouchTap } = this.props;
    this.closeConfirmationDialogAndResetInputs();
    handleTouchTap();
  };

  /**
   * If the user toggles the "Send message to representative" to indicate that
   *    they want to send a message, this updates the message to send
   *    based on a predefined template.
   */
  handleToggleForRepresentativeMessage = (): void => {
    const { lead } = this.props;
    const messageTemplate =
      `You were assigned a lead!%~%
            Customer: ${lead.leadName}
            Description: ${lead.description}
            Source: ${lead.source}`;

    // Multi-line template string includes tab characters, this
    // removes them.
    const dedentedMessage = getDedentedString(messageTemplate);
    const messageToRepresentative = dedentedMessage.replace(/%~%/g, '\n');
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
  handleInputChange = (
    event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement },
    newValue: string = '',
  ): void => {
    const fieldName = event.currentTarget.name;
    if (fieldName === 'sendRepresentativeMessage' && newValue === true) {
      this.handleToggleForRepresentativeMessage();
    } else {
      this.setState({ [fieldName]: newValue });
    }
  };

  /**
   * This updates the contents of the message text field for the Lead entity
   *    if a selection is picked from the text template dropdown menu.
   * @param {Event} event Event associated with the template dropdown menu.
   * @param {Object} child Menu item selected from the dropdown menu.
   */
  handlePredefinedMessageChange = (
    event: Event,
    child: Object,
  ): void => {
    this.setState({ messageToLead: child.key });
  };

  /**
   * Pulls the text templates from global state and replaces any placeholders
   *    with actual values (i.e. name of lead).
   * @returns {Array} Array of text templates with custom data.
   */
  getPopulatedTextTemplates = (): Array<string> => {
    const { lead } = this.props;
    const { textTemplates = [] } = this.props;
    return textTemplates.map((textTemplate) => {
      const { leadName, assignTo } = lead;
      return textTemplate
        .replace(/\[leadName]/g, leadName)
        .replace(/\[assignTo]/g, assignTo);
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

    const MessageBlock = glamorous.div({ margin: '24px 0' });

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
            <glamorous.Div
              alignItems="flex-end"
              display="flex"
            >
              <IconDropdown
                disabled={!sendLeadMessage}
                handleItemTouchTap={this.handlePredefinedMessageChange}
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
            </glamorous.Div>
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
