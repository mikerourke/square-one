/* @flow */

/* External dependencies */
import { List } from 'immutable';
import { createSelector } from 'reselect';

const getParentLead = (state, props) => {
    let leadId = 0;
    if (props.lead) {
        leadId = props.lead.id || 0;
    }
    return state.getIn(['entities', 'leads', 'byId', +leadId]);
};

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
