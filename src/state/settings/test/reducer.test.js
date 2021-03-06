/* External dependencies */
import { OrderedMap, fromJS } from 'immutable';

/* Internal dependencies */
import reducer from '../reducer';

describe('User Reducer', () => {
  it('should return the initial state', () => {
    const reducerValue = reducer(undefined, {});
    const expectedValue = OrderedMap();
    expect(reducerValue).toEqual(expectedValue);
  });
});
