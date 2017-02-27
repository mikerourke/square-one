/* Internal dependencies */
import * as guiActions from '../actions';
import * as types from '../../action-types';
import {
    mockClient,
    mockDb,
    mockStore,
} from '../../../../internals/testing/mock/for-state';

describe('GUI Actions', () => {
    it('creates GUI_TOGGLE_APP_SIDEBAR', () => {
        const initialState = {};
        const store = mockStore(initialState);

        store.dispatch(guiActions.toggleAppSidebar())
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.GUI_TOGGLE_APP_SIDEBAR);
    });
});
