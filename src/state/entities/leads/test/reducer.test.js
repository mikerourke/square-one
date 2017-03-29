/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';
import { normalize } from 'normalizr';

/* Internal dependencies */
const db = require('../../db.mock.json');
import reducer from '../reducer';
import * as types from '../../../action-types';
import { leadsSchema } from '../../schema';

const getNormalizedData = () => normalize(db.leads, leadsSchema);
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
        console.log(reducerValue);
        const countOfLeads = reducerValue.get('byId').size;
        expect(countOfLeads).toEqual(3);
    });

    it('deletes a single Lead from state', () => {
        const initialState = getStateForAllLeads();
        const reducerValue = reducer(initialState, {
            type: types.LEAD_DELETE_SUCCESS,
            payload: {
                data: {
                    "address": "123 Yorktown Shopping Center, Lombard, IL 60148, USA",
                    "assignTo": "Chuckles",
                    "changes": [1021703210001, 1021703210002],
                    "contactName": "",
                    "createdAt": "2017-02-02 14:00:00.000 -05:00",
                    "createdBy": "mike",
                    "description": "This is a lead",
                    "email": "steve@leads.com",
                    "id": 1,
                    "lat": 41.83931079999999,
                    "leadFee": 25,
                    "leadName": "Steve Leadsman",
                    "lng": -88.00729280000002,
                    "messages": [1041703210001, 1041703210002],
                    "notes": [1031703210001, 1031703210002],
                    "phone": "(630) 123-4567",
                    "source": "Facebook",
                    "status": "New",
                    "updatedAt": "2017-02-02 14:00:00.000 -05:00"
                }
            }
        });

        // TODO: Finish this test.
    })
});
