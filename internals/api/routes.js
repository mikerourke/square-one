const moment = require('moment');

module.exports = (router, server) => {
    const db = router.db;

    const getCurrentTime = () =>
        moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');

    const getIdElementsOfLastChild = (parentName, childName) => {
        const parentEntities = db
            .get(`${parentName}s`)
            .value();

        let childIds = [];
        parentEntities.forEach(parent => {
            parent[`${childName}s`].forEach(child => childIds.push(child.id));
        });

        const lastChildId = Math.max(...childIds).toString();
        return {
            type: lastChildId.substring(0, 3),
            dateCreated: lastChildId.substring(3, 9),
            sequence: lastChildId.substring(9),
        };
    };

    const getNewId = (parentName, childName) => {
        const {
            type,
            dateCreated,
            sequence
        } = getIdElementsOfLastChild(parentName, childName);

        let dateForId = moment().format('YYMMDD');
        let sequenceForId = '0000';
        if (dateForId === dateCreated) {
            sequenceForId = sequence;
        }

        const idString = `${type}${dateForId}${sequenceForId}`;
        console.log(idString);
        return (parseInt(idString, 10) + 1);
    };

    const addGetRoute = (parentName, childName, urlPath) => {
        server.get(urlPath, (req, res) => {
            const parentId = req.params[`${parentName}Id`];
            const childId = req.params[`${childName}Id`];
            const childToGet = db.get(`${parentName}s`)
                .getById(parentId)
                .get(`${childName}s`)
                .getById(childId)
                .value();
            res.jsonp(childToGet);
        });
    };

    const addPatchRoute = (parentName, childName, urlPath) => {
        server.patch(urlPath, (req, res) => {
            const parentId = req.params[`${parentName}Id`];
            const childId = req.params[`${childName}Id`];
            const childRecord = Object.assign({}, req.body, {
               updatedAt: getCurrentTime(),
            });
            delete childRecord.typeName;
            db.get(`${parentName}s`)
                .getById(parentId)
                .get(`${childName}s`)
                .getById(childId)
                .assign(childRecord)
                .write();
            res.jsonp(childRecord);
        });
    };

    const getChildRecord = (parentName, childName, entity) => {
        const currentTime = getCurrentTime();
        let childRecord = Object.assign({}, entity, {
            id: getNewId(parentName, childName),
            createdAt: currentTime,
            createdBy: 'mike',
            updatedAt: currentTime,
        });
        delete childRecord.typeName;
        return childRecord;
    };

    const addPostRoute = (parentName, childName, urlPath) => {
        server.post(urlPath, (req, res) => {
            const parentId = req.params[`${parentName}Id`];
            const childrenInDb = db
                .get(`${parentName}s`)
                .getById(parentId)
                .get(`${childName}s`);

            const bodyData = req.body;
            const childrenForResponse = [];
            if (Array.isArray(bodyData)) {
                bodyData.forEach((bodyItem) => {
                    const childItem =
                        getChildRecord(parentName, childName, bodyItem);
                    childrenInDb
                        .push(childItem)
                        .write();
                    childrenForResponse.push(childItem);
                })
            } else {
                const singleItem =
                    getChildRecord(parentName, childName, bodyData);
                childrenInDb
                    .push(childItem)
                    .write();
                childrenForResponse.push(singleItem);
            }
            if (childrenForResponse.length > 1) {
                res.jsonp(childrenForResponse);
            } else {
                res.jsonp(childrenForResponse[0]);
            }
        });
    };

    const addDeleteRoute = (parentName, childName, urlPath) => {
        server.delete(urlPath, (req, res) => {
            const parentId = req.params[`${parentName}Id`];
            const childId = req.params[`${childName}Id`];
            const childrenInDb = db
                .get(`${parentName}s`)
                .getById(parentId)
                .get(`${childName}s`);

            const childToDelete = childrenInDb
                .getById(childId)
                .value();

            childrenInDb
                .remove({ id: parseInt(childId, 10) })
                .write();

            res.jsonp(childToDelete);
        });
    };

    const childName = ['change', 'message', 'note'];
    childName.forEach(child => {
        const routeUrl = `/leads/:leadId/${child}s`;
        addGetRoute('lead', child, `${routeUrl}/:${child}Id`);
        addDeleteRoute('lead', child, `${routeUrl}/:${child}Id`);
        addPatchRoute('lead', child, `${routeUrl}/:${child}Id`);
        addPostRoute('lead', child, routeUrl);
    });

    return server;
};
