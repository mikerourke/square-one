/* @flow */

/* External dependencies */
import { List } from 'immutable';
import { createSelector } from 'reselect';

const getParentLead = (state, props) =>
    state.getIn(['entities', 'leads', 'byId', props.lead.id.toString()]);

const getChanges = state => state.getIn(['entities', 'changes', 'byId']);

export const selectChangesInLead = createSelector(
    [getParentLead, getChanges],
    (parentLead, changes) => {
        if (parentLead) {
            const changesInLead = parentLead.get('changes');
            return changes
                .filter(change => changesInLead.includes(change.id))
                .toList();
        }
        return new List();
    },
);
