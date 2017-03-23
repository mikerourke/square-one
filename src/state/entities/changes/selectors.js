/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getParentLead = (state, props) =>
    state.getIn(['entities', 'leads', 'byId', props.lead.id.toString()]);

const getChanges = (state, props) =>
    state.getIn(['entities', 'changes', 'byId']);

export const selectChangesInLead = createSelector(
    [getParentLead, getChanges],
    (parentLead, changes) => {
        const changesInLead = parentLead.get('changes');
        return changes
            .filter(change => changesInLead.includes(change.id))
            .toList();
    },
);
