/* @flow */

/* External dependencies */
import { List } from 'immutable';
import { createSelector } from 'reselect';

const getLeads = state => state.getIn(['entities', 'leads', 'byId']);

export const getParentLead = (state, props) => {
  let leadId = 0;
  if (props.lead) {
    leadId = props.lead.id || 0;
  }
  return state.getIn(['entities', 'leads', 'byId', +leadId]);
};

export const selectAllLeads = createSelector(
  getLeads,
  (leads) => {
    if (leads) {
      return leads;
    }
    return new List();
  },
);
