/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import {
  getDisplayDate,
  getDisplayPhone,
  getProperCase,
} from 'lib/display-formats';
import { toggleGlobalDialog } from 'state/gui/actions';
import { selectMessagesInLead } from 'state/entities/messages/selectors';
import { Lead, Message, User } from 'state/entities/models';
import CardList from 'components/card-list';
import MessagesDialog from '../messages-dialog/index';

/* Types */
import type { CardEntity } from 'components/card-list';
import type { NoticeType } from 'lib/types';

type DefaultProps = {
  messages: List<Message>,
};

type Props = {
  lead: Lead,
  messages?: List<Message>,
  showAddButton: boolean,
  toggleGlobalDialog: (title: string, message: string,
    noticeType: NoticeType) => void;
};

type State = {
  isMessageDialogOpen: boolean,
};

const mapStateToProps = (state, ownProps) => ({
  messages: selectMessagesInLead(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  toggleGlobalDialog: (title, message, noticeType) =>
    dispatch(toggleGlobalDialog(title, message, noticeType)),
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
    const { lead } = this.props;
    if (lead.assignTo === '') {
      // TODO: Toggle dialog to let user know they need to specify an assigned to user.
    } else {
      this.setState({ isMessageDialogOpen: true });
    }
  };

  /**
   * Hide the messages dialog when an action is performed.
   */
  handleDialogTouchTap = (): void => {
    this.setState({ isMessageDialogOpen: false });
  };

  /**
   * Returns the formatted title elements to display on the cards based on the
   *    title line ("title" or "subtitle").
   * @param {Message} message Message entity displayed on the card.
   * @param {string} titleLine Title line to display text.
   * @returns {string} Formatted title or subtitle.
   */
  getTitleElement = (message: Message, titleLine: 'title' | 'subtitle') => {
    const { lead } = this.props;
    const { subject, recipient, messageType } = message;

    // If the message type was a text message, the recipient is set to a
    // formatted phone number, otherwise it's set to a lowercase email address.
    const formattedRecipient = messageType === 'text'
      ? getDisplayPhone(recipient)
      : recipient.toLowerCase();

    // The default title is "Message to Lead" or "Message to Representative",
    // this removes the "Message to " to determine the target.
    const targetRole = subject.replace('Message to ', '');

    // TODO: Fix so message reflects the representative the text was originally sent to, not the current assign to.
    // If "Lead" was the target, the name of the recipient is set to the name
    // of the lead, otherwise it's set to the representative that the lead
    // was assigned to.
    const targetName = (targetRole === 'Lead') ? lead.leadName : lead.assignTo;

    // For the "title" element, replace the word "Lead" or "Representative" with
    // either the name of the lead or the name of the representative that
    // received the message and return it, otherwise ensure the message type
    // is properly cased and return the message type and recipient as the
    // subtitle:
    return titleLine === 'title'
      ? subject.replace(targetRole, targetName)
      : `${getProperCase(messageType)} sent to ${formattedRecipient}`;
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
        .map(message => ({
          id: message.id,
          title: this.getTitleElement(message, 'title'),
          subtitle: this.getTitleElement(message, 'subtitle'),
          header: `Sent by ${message.getIn(['createdBy', 'fullName'])}`,
          subheader: getDisplayDate(message.createdAt),
          contents: message.body,
        }));
    }
    return cardEntities;
  };

  render(): React.Element<*> {
    const { lead, showAddButton } = this.props;
    const { isMessageDialogOpen } = this.state;
    const fieldsToSearch =
      ['title', 'subtitle', 'header', 'subheader', 'contents'];

    return (
      <div>
        <CardList
          cardEntities={this.getCardEntities()}
          handleAddTouchTap={this.handleAddButtonTouchTap}
          hasActions={false}
          multipleCardsPerRow={false}
          searchFieldInclusions={fieldsToSearch}
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
