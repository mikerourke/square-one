/* @flow */

/**
 * Types associated with Component and Container elements.
 */
export type Selection = {
    id: string,
    value: string,
};

export type MapLocation = {
    address: string,
    lat: number,
    lng: number,
};

/**
 * Types associated with Redux.
 */
export type Action =
    {
        type: string,
        payload: Promise<any>
    } |
    {
        type: string,
        payload: {
            data: any,
        }
    }
  | { type: string }

export type GetState = () => Object;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
