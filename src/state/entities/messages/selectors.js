/* @flow */

/* External dependencies */
import { List } from 'immutable';
import { createSelector } from 'reselect';

/* Internal dependencies */
import { getParentLead } from '../leads/selectors';

const getMessages = state => state.getIn(['entities', 'messages', 'byId']);

export const selectMessagesInLead = createSelector(
  [getParentLead, getMessages],
  (parentLead, messages) => {
    if (parentLead) {
      const messagesInLead = parentLead.get('messages');
      return messages
        .filter(message => messagesInLead.includes(message.id))
        .toList();
    }
    return new List();
  },
);
