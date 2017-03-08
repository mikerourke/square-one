/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';
import { normalize } from 'normalizr';

/* Internal dependencies */
import reducer from '../reducer';
import * as types from '../../../action-types';
import leadsSchema from '../../schema';
import { createMockStore, mockClient } from '../../../index.test';
import { mockData } from './model.test';

const getNormalizedData = () => normalize(mockData, leadsSchema);
const getStateForAllLeads = () => reducer(
    undefined, {
        type: types.LEAD_GET_ALL_SUCCESS,
        payload: {
            data: getNormalizedData(),
        }
    });

describe('Lead Reducer', () => {
    it('should return the initial state', () => {
        const reducerValue = reducer(undefined, {});
        const expectedValue = OrderedMap();
        expect(reducerValue).toEqual(expectedValue);
    });

    it('hydrates the state with Leads', () => {
        const normalizedData = getNormalizedData();
        const reducerValue = getStateForAllLeads();

        const counts = [
            reducerValue.get('entities').count(),
            reducerValue.get('entities').get('changes').count(),
            reducerValue.get('entities').get('leads').count(),
            reducerValue.get('entities').get('notes').count(),
        ];
        expect(counts).toEqual([3, 6, 3, 6]);
    });

    it('deletes a single Lead from state', () => {
        const initialState = getStateForAllLeads();
        const reducerValue = reducer(initialState, {
            type: types.LEAD_DELETE_SUCCESS,
            id: 1
        });

        // TODO: Finish this test.
    })
});
