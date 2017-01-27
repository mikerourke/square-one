import { expect } from 'chai';
import {
    actions as leadActions,
    actionTypes,
} from '../index';
import {
    mockClient,
    mockDb,
    mockStore,
} from '../../data.mock';

describe('Lead Actions', () => {
    mockClient
        .onGet('/leads').reply(200)
        .onGet('/leads/1').reply(200)
        .onGet('/leads/2').reply(404);

    it('creates GET_LEAD and GET_LEAD_SUCCESS for a valid Lead', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        store.dispatch(leadActions.getLead(1)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).to.equal(actionTypes.GET_LEAD);
            expect(actions[1].type).to.equal(actionTypes.GET_LEAD_SUCCESS);
            done();
        });
    });

    it('creates GET_LEAD and GET_LEAD_FAIL for an invalid Lead', (done) => {
        const initialState = {};
        const store = mockStore(initialState);
        store.dispatch(leadActions.getLead(2)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).to.equal(actionTypes.GET_LEAD);
            expect(actions[1].type).to.equal(actionTypes.GET_LEAD_FAIL);
            done();
        });
    });
});
