/* Internal dependencies */
import reducer from '../reducer';
import User from '../model';

describe('User Reducer', () => {
    it('should return the initial state', () => {
        const reducerValue = reducer(undefined, {});
        const expectedValue = new User();
        expect(reducerValue).toEqual(expectedValue);
    });
});
