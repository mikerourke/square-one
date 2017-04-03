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
    CHANGES_CREATE_SUCCESS,
    MESSAGES_SEND_SUCCESS,
    NOTE_CREATE_SUCCESS, NOTE_DELETE_SUCCESS,
} from '../../action-types';
import Lead from './model';

/* Types */
import type { Action } from 'lib/types';

// $FlowFixMe
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
            ([key, value]) => ([+key, new Lead(fromJS(value))]))]),
        allIds: new List(result),
        error: new Map(),
    });
};

const getChildDataFromPayload = (payload: Object): Object => {
    const {
        config: { url },
        data,
    } = (payload: Object);

    const urlArray = url.split('/');
    let leadId = '';
    let groupName = '';
    urlArray.forEach((value, index) => {
        if (value.includes('lead')) {
            leadId = urlArray[index + 1];
            groupName = urlArray[index + 2];
        }
    });

    return {
        data,
        pathInState: ['byId', +leadId, groupName],
    };
};

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case LEAD_CREATE_FAIL:
        case LEAD_DELETE_FAIL:
        case LEAD_GET_ALL_FAIL:
        case LEAD_GET_SINGLE_FAIL:
        case LEAD_UPDATE_FAIL:
            const { error: { response } } = (action: Object);
            return state.set('error', fromJS(response));

        case LEAD_CREATE_SUCCESS:
            const { payload: { data: newLead } } = (action: Object);
            return state
                .setIn(['byId', +newLead.id], new Lead(fromJS(newLead)))
                // $FlowIgnore
                .set('allIds', state.get('allIds').push(+newLead.id));

        case LEAD_GET_SINGLE_SUCCESS:
        case LEAD_UPDATE_SUCCESS:
            const { payload: { data: existingLead } } = (action: Object);
            return state.setIn(['byId', +existingLead.id],
                new Lead(fromJS(existingLead)));

        case LEAD_DELETE_SUCCESS:
            const { payload: { data: { id } } } = (action: Object);
            let leadId = 0;
            if (id) {
                leadId = id;
            }
            return state
                .deleteIn(['byId', +leadId])
                .set('allIds', state.get('allIds')
                    .filter(idNumber => idNumber !== +leadId));

        case LEAD_GET_ALL_SUCCESS:
            const { payload: { data: responseData } } = (action: Object);
            return mergeEntities(state, responseData);

        case MESSAGES_SEND_SUCCESS:
            const { payload: messagesPayload } = (action: Object);
            const messages = getChildDataFromPayload(messagesPayload);
            const messageIds = messages.data.map(message => +message.id);
            return state.mergeIn(messages.pathInState, messageIds);

        case CHANGES_CREATE_SUCCESS:
        case NOTE_CREATE_SUCCESS:
            const { payload: createdPayload } = (action: Object);
            const newChild = getChildDataFromPayload(createdPayload);
            const newChildGroup: any = state.getIn(newChild.pathInState);
            return state.setIn(newChild.pathInState,
                newChildGroup.push(+newChild.data.id));

        case NOTE_DELETE_SUCCESS:
            const { payload: deletedPayload } = (action: Object);
            const deleteChild = getChildDataFromPayload(deletedPayload);
            const deleteChildGroup: any = state.getIn(deleteChild.pathInState);
            const deleteChildState = deleteChildGroup
                .filter(childId => childId !== +deleteChild.data.id);
            return state.setIn(deleteChild.pathInState, deleteChildState);

        default:
            return state;
    }
};
