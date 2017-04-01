/* @flow */

/* External dependencies */
import { createSelector } from 'reselect';

const getUsers = state => state.getIn(['entities', 'users', 'byId']);

export const selectUsersInState = createSelector(
    getUsers,
    users => users.toList(),
);
