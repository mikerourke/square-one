/* @flow */

/* External dependencies */
import { fromJS, Map, OrderedMap } from 'immutable';

/* Internal dependencies */
import * as models from './models';

/* Types */
import type { EntityState } from 'lib/types';

/**
 * Returns an array of objects representing entity records from the API call.
 * @param {Object} data Data from the API response.
 * @param {string} entityName Name of the entity.
 * @returns {Array}
 */
const getInstances = (
  data: Object,
  entityName: string,
): Array<Object> => {
  const { entities } = (data: Object);

  // The entityName passed to the function is in the format "Lead".  To get the
  // entities from the API response, it needs to be converted to "leads".
  const groupName = `${entityName.toLowerCase()}s`;

  if (entities[groupName]) {
    return entities[groupName];
  }
  return [];
};

/**
 * Returns the new state with updated entity data and any error details.
 * @param {EntityState} state Existing Redux state.
 * @param {Object} data Data from the API return call.
 * @param {string} entityName Name of entity model to create.
 * @returns {EntityState} Updated state with new data.
 */
export const mergeEntitiesIntoState = (
  state: EntityState,
  data: Object,
  entityName: string,
): EntityState => {
  const instances = getInstances(data, entityName);
  let byIdOrderedMap = OrderedMap();
  if (instances) {
    const instanceEntries = Object.entries(instances);
    byIdOrderedMap = OrderedMap([...instanceEntries.map(
      ([key, value]) => ([+key, new models[entityName](fromJS(value))]))]);
  }
  return state.merge({
    byId: byIdOrderedMap,
    error: new Map(),
  });
};
