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

const getNotes = state => state.getIn(['entities', 'notes', 'byId']);

export const selectNotesInLead = createSelector(
    [getParentLead, getNotes],
    (parentLead, notes) => {
        if (parentLead) {
            const notesInLead = parentLead.get('notes');
            return notes
                .filter(note => notesInLead.includes(note.id))
                .toList();
        }
        return new List();
    },
);

