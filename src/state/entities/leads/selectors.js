/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getLeads = state => state.getIn(['entities', 'leads', 'byId']);

export const selectAllLeads = createSelector(
    getLeads,
    leads => leads,
);
