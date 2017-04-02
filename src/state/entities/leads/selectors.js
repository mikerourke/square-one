/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getLeads = state => state.getIn(['entities', 'leads', 'byId']);

export const selectLeads = createSelector(
    getLeads,
    leads => leads,
);
