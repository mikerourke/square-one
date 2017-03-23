/* @flow */

/* External dependencies */
import {
    fromJS,
    List,
    Map,
    OrderedMap,
} from 'immutable';

/* Internal dependencies */
import {
    LEAD_CREATE_SUCCESS, LEAD_CREATE_FAIL,
    LEAD_DELETE_SUCCESS, LEAD_DELETE_FAIL,
    LEAD_GET_ALL_SUCCESS, LEAD_GET_ALL_FAIL,
    LEAD_GET_SINGLE_SUCCESS, LEAD_GET_SINGLE_FAIL,
    LEAD_UPDATE_SUCCESS, LEAD_UPDATE_FAIL,
    CHANGE_CREATE_SUCCESS, CHANGE_DELETE_SUCCESS,
    MESSAGE_CREATE_SUCCESS, MESSAGE_DELETE_SUCCESS,
    NOTE_CREATE_SUCCESS, NOTE_DELETE_SUCCESS,
} from '../../action-types';
import Lead from './model';

/* Types */
import type { Action } from 'lib/types';

type ByIdMap = Map<number, Lead>;
type AllIdsList = List<number>;
type ErrorMap = Map<string, any>;
type State = Map<string, ByIdMap | AllIdsList | ErrorMap>;

const initialState = OrderedMap();

/**
 * Returns the new state with updated entity data and any error details.
 * @param {State} state Existing Redux state.
 * @param {Object} data Data from the API return call.
 * @returns {State} Updated state with new data.
 */
const mergeEntities = (state: State, data: Object): State => {
    const { entities: { leads }, result } = (data: Object);
    return state.merge({
        byId: OrderedMap([...Object.entries(leads).map(
            ([key, value]) => ([key, new Lead(fromJS(value))]))]),
        allIds: new List(result),
        error: new Map(),
    });
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case LEAD_CREATE_FAIL:
        case LEAD_DELETE_FAIL:
        case LEAD_GET_ALL_FAIL:
        case LEAD_GET_SINGLE_FAIL:
        case LEAD_UPDATE_FAIL:
            const { error } = (action: Object);
            return state.set('error', fromJS(error));

        case LEAD_CREATE_SUCCESS:
        case LEAD_GET_SINGLE_SUCCESS:
        case LEAD_UPDATE_SUCCESS:
            const { payload: { data: leadToSet } } = (action: Object);
            return state
                .setIn(['byId', leadToSet.id], fromJS(leadToSet))
                .setIn(['allIds', leadToSet.id]);

        case LEAD_DELETE_SUCCESS:
            const { id } = (action: Object);
            return state
                .deleteIn(['byId', id])
                .get('allIds')
                .filter(leadId => leadId.toString() !== id.toString());

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: entities } } = (action: Object);
            return mergeEntities(state, entities);

        case CHANGE_CREATE_SUCCESS:
        case MESSAGE_CREATE_SUCCESS:
        case NOTE_CREATE_SUCCESS:
            console.log(action);
            return state;

        case CHANGE_DELETE_SUCCESS:
        case MESSAGE_DELETE_SUCCESS:
        case NOTE_DELETE_SUCCESS:
            const { meta: {
                previousAction: {
                    payload: { parent },
                },
            } } = (action: Object);
            const groupName = action.type.split('/')[0];
            return state.deleteIn(['byId']);

        default:
            return state;
    }
};
