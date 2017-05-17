/* Internal dependencies */
import reducer from '../reducer';
import Session from '../model';

describe('Session Reducer', () => {
  it('should return the initial state', () => {
    const reducerValue = reducer(undefined, {});
    const expectedValue = new Session();
    expect(reducerValue).toEqual(expectedValue);
  });
});
