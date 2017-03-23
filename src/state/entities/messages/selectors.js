/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getParentLead = (state, props) =>
    state.getIn(['entities', 'leads', 'byId', props.lead.id]);

const getMessages = (state, props) =>
    state.getIn(['entities', 'messages', 'byId']);

export const selectMessagesInLead = createSelector(
    [getParentLead, getMessages],
    (parentLead, messages) => {
        const messagesInLead = parentLead.get('messages');
        return messages.filter(message => messagesInLead.includes(message.id));
    },
);
