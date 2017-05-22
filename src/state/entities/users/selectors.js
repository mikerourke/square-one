/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

/* Internal dependencies */
import { getParentLead } from '../leads/selectors';
import User from './model';

const getUsers = state => state.getIn(['entities', 'users', 'byId']);

export const selectUsersInState = createSelector(
  getUsers,
  users => users.toList(),
);

export const selectAssignToUserForLead = createSelector(
  [getParentLead, getUsers],
  (parentLead, users) => {
    if (parentLead) {
      return users.find(user => user.fullName === parentLead.assignTo);
    }
    return new User();
  },
);
