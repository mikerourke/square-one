/* Internal dependencies */
import reducer from '../reducer';

describe('GUI Reducer', () => {
    it('should return the initial state', () => {
        const reducerValue = reducer(undefined, {});
        const expectedValue = {
            appSidebarOpen: false,
        }
        expect(reducerValue.toJS()).toEqual(expectedValue);
    });
});