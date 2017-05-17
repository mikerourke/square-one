/* @flow */

/**
 * Parses the payload from the Axios middleware request to get the ID of the
 *    entity corresponding with the parent name.
 * @param {Object} payload Payload returned from the request.
 * @param {string} parentName Name of the group to find the ID for.
 * @returns {number} ID number of the entity.
 */
export const getIdFromPayload = (
  payload: Object,
  parentName: string,
): number => {
  const { config: { url } } = (payload: Object);

  const urlArray = url.split('/');
  let entityId = '0';
  urlArray.forEach((value, index) => {
    if (value.includes(parentName)) {
      entityId = urlArray[index + 1];
    }
  });
  return +entityId;
};

/**
 * Exrapolates the parent ID, child ID, and path to the group of child entities
 *    in state from the request payload.
 * @param {Object} payload Payload data from the HTTP request.
 * @param {string} parentName Name of the parent entity.
 * @returns {Object}
 */
export const getChildDataFromPayload = (
  payload: Object,
  parentName: string,
): Object => {
  const { config: { url }, data } = (payload: Object);

  const urlArray = url.split('/');
  let parentId = '';
  let groupName = '';
  let childId = '';
  urlArray.forEach((value, index) => {
    if (value.includes(parentName)) {
      parentId = urlArray[index + 1];
      groupName = urlArray[index + 2];
      childId = urlArray[index + 3];
    }
  });

  return {
    childId,
    data,
    pathInState: ['byId', +parentId, groupName],
  };
};
