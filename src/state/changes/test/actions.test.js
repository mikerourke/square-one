/* Internal dependencies */
import * as actions from '../actions';
import * as types from '../../action-types';
import {
    mockClient,
    mockDb,
    mockStore,
} from '../../../../internals/testing/mock/for-state';

describe('Change Actions', () => {
    beforeAll(() => {
        mockClient.reset();
    });

    it('creates CHANGE_GET_SINGLE and CHANGE_GET_SINGLE_SUCCESS for a valid Change', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        mockClient.onGet('/changes/1').reply(200);

        store.dispatch(actions.getChange(1)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.CHANGE_GET_SINGLE);
            expect(actions[1].type).toEqual(types.CHANGE_GET_SINGLE_SUCCESS);
            done();
        });
    });

    it('creates CHANGE_GET_SINGLE and CHANGE_GET_SINGLE_FAIL for an invalid Change', (done) => {
        const initialState = {};
        const store = mockStore(initialState);

        mockClient.onGet('/changes/2').reply(404);

        store.dispatch(actions.getChange(2)).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.CHANGE_GET_SINGLE);
            expect(actions[1].type).toEqual(types.CHANGE_GET_SINGLE_FAIL);
            done();
        });
    });

    it('creates CHANGE_GET_ALL and CHANGE_GET_ALL_SUCCESS for valid Changes',
        (done) => {
            const initialState = {};
            const store = mockStore(initialState);

            /*
             * The changes data is normalized in the response (using Axios'
             * transformResponse method.  The test will fail if the data
             * field is empty:
             */
            mockClient.onGet('/leads/1/changes').reply(200, {
                changes: mockDb.changes,
            });

            store.dispatch(actions.getAllChanges('/leads/1')).then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.CHANGE_GET_ALL);
                expect(actions[1].type).toEqual(types.CHANGE_GET_ALL_SUCCESS);
                done();
            });
        });
});
