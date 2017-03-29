/* Internal dependencies */
const db = require('../../db.mock.json');
import * as actions from '../actions';
import * as types from '../../../action-types';
import { createMockStore, mockClient } from '../../../index.mock';

describe('Lead Actions', () => {
    beforeAll(() => {
        mockClient.reset();
    });

    it('creates LEAD_GET_SINGLE and LEAD_GET_SINGLE_SUCCESS for a valid Lead', (done) => {
        mockClient.onGet('/leads/1011703210001').reply(200);

        const store = createMockStore();
        store.dispatch(actions.getLead(1011703210001)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.LEAD_GET_SINGLE);
            expect(actions[1].type).toEqual(types.LEAD_GET_SINGLE_SUCCESS);
            done();
        });
    });

    it('creates LEAD_GET_SINGLE and LEAD_GET_SINGLE_FAIL for an invalid Lead', (done) => {
        mockClient.onGet('/leads/1011703210002').reply(404);

        const store = createMockStore();
        store.dispatch(actions.getLead(1011703210002)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.LEAD_GET_SINGLE);
            expect(actions[1].type).toEqual(types.LEAD_GET_SINGLE_FAIL);
            done();
        });
    });

    it('creates LEAD_GET_ALL and LEAD_GET_ALL_SUCCESS for valid Leads',
        (done) => {
            /*
             * The leads data is normalized in the response (using Axios'
             * transformResponse method.  The test will fail if the data
             * field is empty:
             */
            mockClient.onGet('/leads').reply(200, {
                leads: db,
            });

            const store = createMockStore();
            store.dispatch(actions.getAllLeads()).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.LEAD_GET_ALL);
                expect(actions[1].type).toEqual(types.LEAD_GET_ALL_SUCCESS);
                done();
            });
        });
});
