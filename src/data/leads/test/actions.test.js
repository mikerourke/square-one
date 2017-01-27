import { expect } from 'chai';
import {
    actions as leadActions,
    actionTypes as types,
} from '../index';
import {
    mockClient,
    mockDb,
    mockStore,
} from '../../data.mock';

describe('Lead Actions', () => {
    it('creates GET_LEAD and GET_LEAD_SUCCESS for a valid Lead', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        mockClient.onGet('/leads/1').reply(200);

        store.dispatch(leadActions.getLead(1)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).to.equal(types.GET_LEAD);
            expect(actions[1].type).to.equal(types.GET_LEAD_SUCCESS);
            done();
        });
    });

    it('creates GET_LEAD and GET_LEAD_FAIL for an invalid Lead', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        mockClient.onGet('/leads/2').reply(404);

        store.dispatch(leadActions.getLead(2)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).to.equal(types.GET_LEAD);
            expect(actions[1].type).to.equal(types.GET_LEAD_FAIL);
            done();
        });
    });

    it('creates GET_ALL_LEADS and GET_ALL_LEADS_SUCCESS for valid Leads',
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

            store.dispatch(leadActions.getAllLeads()).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).to.equal(types.GET_ALL_LEADS);
                expect(actions[1].type).to.equal(types.GET_ALL_LEADS_SUCCESS);
                done();
            });
        });
});
