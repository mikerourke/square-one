/* Internal dependencies */
import reducer from '../reducer';

describe('GUI Reducer', () => {
    it('should return the initial state', () => {
        const reducerValue = reducer(undefined, {});
        const expectedValue = {
            sidebarOpen: false,
        };
        expect(reducerValue.toJS()).toEqual(expectedValue);
    });
});
