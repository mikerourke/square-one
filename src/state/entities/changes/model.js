/* @flow */

/* External dependencies */
import { Map, Record } from 'immutable';

export default class Change extends Record({
  id: (0: number),
  changeType: ('': string),
  iconName: ('': string),
  title: ('': string),
  details: ('': string),
  createdBy: (new Map(): Map<string, any>),
  createdAt: (null: ?Date),
  updatedBy: (new Map(): Map<string, any>),
  updatedAt: (null: ?Date),
  typeName: ('change': string),
}) {}
