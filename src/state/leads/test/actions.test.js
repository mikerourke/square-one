/* Internal dependencies */
import * as actions from '../actions';
import * as types from '../../action-types';
import {
    mockClient,
    mockDb,
    mockStore,
} from '../../../../internals/testing/mock/for-state';

describe('Lead Actions', () => {
    beforeAll(() => {
        mockClient.reset();
    });

    it('creates LEAD_GET_SINGLE and LEAD_GET_SINGLE_SUCCESS for a valid Lead', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        mockClient.onGet('/leads/1').reply(200);

        store.dispatch(actions.getLead(1)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.LEAD_GET_SINGLE);
            expect(actions[1].type).toEqual(types.LEAD_GET_SINGLE_SUCCESS);
            done();
        });
    });

    it('creates LEAD_GET_SINGLE and LEAD_GET_SINGLE_FAIL for an invalid Lead', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        mockClient.onGet('/leads/2').reply(404);

        store.dispatch(actions.getLead(2)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.LEAD_GET_SINGLE);
            expect(actions[1].type).toEqual(types.LEAD_GET_SINGLE_FAIL);
            done();
        });
    });

    it('creates LEAD_GET_ALL and LEAD_GET_ALL_SUCCESS for valid Leads',
        (done) => {
            const initialState = {};
            const store = mockStore(initialState);

            /*
             * The leads data is normalized in the response (using Axios'
             * transformResponse method.  The test will fail if the data
             * field is empty:
             */
            mockClient.onGet('/leads').reply(200, {
                leads: mockDb.leads,
            });

            store.dispatch(actions.getAllLeads()).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.LEAD_GET_ALL);
                expect(actions[1].type).toEqual(types.LEAD_GET_ALL_SUCCESS);
                done();
            });
        });
});
