/* Internal dependencies */
import reducer from '../reducer';
import Session from '../model';

describe('Session Reducer', () => {
    it('should return the initial state', () => {
        const reducerValue = reducer(undefined, {});
        const expectedValue = new User();
        expect(reducerValue).toEqual(expectedValue);
    });
});
