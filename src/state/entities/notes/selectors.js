/* @flow */

/* External dependencies */
import { List } from 'immutable';
import { createSelector } from 'reselect';

/* Internal dependencies */
import { getParentLead } from '../leads/selectors';

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

