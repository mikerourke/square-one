/* @flow */

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

export const getChildDataFromPayload = (
    payload: Object,
    parentName: string,
): Object => {
    const { config: { url }, data } = (payload: Object);

    const urlArray = url.split('/');
    let parentId = '';
    let groupName = '';
    urlArray.forEach((value, index) => {
        if (value.includes(parentName)) {
            parentId = urlArray[index + 1];
            groupName = urlArray[index + 2];
        }
    });

    return {
        data,
        pathInState: ['byId', +parentId, groupName],
    };
};
