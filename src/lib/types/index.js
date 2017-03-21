/* @flow */

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
 * Types associated with Redux.
 */
export type Action =
    { type: string, payload: { data: any } | Promise<any> }
  | { type: string, payload: { id: number, data: any } }
  | { type: string, payload: { leadId: number, group: string, data: any } }
  | { type: string }

export type GetState = () => Object;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
