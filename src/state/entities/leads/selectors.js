/* @flow */

/* External dependencies */
import { List } from 'immutable';
import { createSelector } from 'reselect';

const getLeads = state => state.getIn(['entities', 'leads', 'byId']);

export const selectAllLeads = createSelector(
    getLeads,
    (leads) => {
        if (leads) {
            return leads;
        }
        return new List();
    },
);
