import { expect } from 'chai';
import * as leadActions from '../actions';
import { mockClient, mockDb, mockStore } from '../../data.mock';

describe('Lead Actions', () => {
    mockClient
        .onGet('/leads/1').reply(200)
        .onGet('/leads/2').reply(404);

    it('creates GET_LEAD when getting a Lead', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        store.dispatch(leadActions.getLead(1)).then(() => {
            const actions = store.getActions();
            console.log(actions);
        });
    });
});
