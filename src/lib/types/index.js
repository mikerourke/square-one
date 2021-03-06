/* @flow */

/* Types */
import type { Map, Record } from 'immutable';

/**
 * Geographical location on a map.
 * @typedef MapLocation
 */
export type MapLocation = {
    address: string,
    lat: number,
    lng: number,
};

/**
 * Difference between two Record values.
 * @typedef RecordDiff
 */
export type RecordDiff = {
    key: string,
    fromValue: string | number,
    toValue: string | number,
};

/**
 * Represents a bug in the application.
 * @typedef Bug
 */
export type Bug = {
  description?: string,
  submittedBy?: string,
  dateSubmitted?: string,
};

/**
 * Where style is to be applied (for Material-UI components).
 * @typedef StyleTarget
 */
export type StyleTarget =
    'body'
  | 'content'
  | 'title';

/**
 * Nature of notice associated with global Dialog or Snackbar.
 * @typedef NoticeType
 */
export type NoticeType =
    'error'
  | 'inform'
  | 'success'
  | 'none';

/**
 * Types associated with Redux.
 */
export type Action =
    { type: string, payload: Object }
  | { type: string, payload: string }
  | { type: string, payload: { data: any } | Promise<any> }
  | { type: string, payload: { id: number, data: any } }
  | { type: string, payload: { leadId: number, group: string, data: any } }
  | { type: string }

export type GetState = () => Object;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

type ByIdMap = Map<number | string, Record<*>>;
type ErrorMap = Map<number | string, any>;
export type EntityState = Map<string, ByIdMap & ErrorMap>;
