/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getParentLead = (state, props) =>
    state.getIn(['entities', 'leads', 'byId', props.lead.id]);
const getNotes = state => state.getIn(['entities', 'notes', 'byId']);

export const selectNotesInLead = createSelector(
    [getParentLead, getNotes],
    (parentLead, notes) => {
        const notesInLead = parentLead.get('notes');
        return notes.filter(note => notesInLead.includes(note.id));
    },
);

