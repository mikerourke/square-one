const moment = require('moment');

module.exports = (router, server) => {
    const db = router.db;

    const getCurrentTime = () =>
        moment().format('YYYY-MM-DD HH:mm:ss');

    /**
     * Finds the last element of the specified type in the database and returns
     *      the corresponding ID elements associated with the item.
     * @param {string} parentName Name of the parent entity.
     * @param {string} [childName] Name of the child entity.
     * @returns {Object} ID elements of the last child entity.
     */
    const getIdElementsOfEntity = (parentName, childName) => {
        let parentIds = [];
        let childIds = [];

        const parentEntities = db
            .get(`${parentName}s`)
            .value();
        parentEntities.forEach(parent => {
            parentIds.push(parent.id);
            if (childName) {
                const childEntities = parent[`${childName}s`];
                childEntities.forEach(child => childIds.push(child.id));
            }
        });

        let entityIds = parentIds;
        if (childName) {
            entityIds = childIds;
        }

        const lastId = Math.max(...entityIds).toString();
        return {
            type: lastId.substring(0, 3),
            dateCreated: lastId.substring(3, 9),
            sequence: lastId.substring(9),
        };
    };

    /**
     * Returns the next ID number based on the entity type.
     * @param {string} parentName Name of the parent entity.
     * @param {string} [childName] Name of the child entity.
     * @returns {number} Next ID number.
     */
    const getNewId = (parentName, childName) => {
        const {
            type,
            dateCreated,
            sequence
        } = getIdElementsOfEntity(parentName, childName);

        let dateForId = moment().format('YYMMDD');
        let sequenceForId = '0000';
        if (dateForId === dateCreated) {
            sequenceForId = sequence;
        }

        const idString = `${type}${dateForId}${sequenceForId}`;
        return (parseInt(idString, 10) + 1);
    };

    /**
     * Adds a route to the entity for handling GET requests, which returns the
     *      entity that matches the request parameters in the response.
     * @param {string} parentName Name of the parent entity.
     * @param {string} childName Name of the child entity.
     * @param {string} urlPath URL path of the request.
     */
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

    /**
     * Adds a route to the entity for handling PATCH requests, which updates
     *      the entity in the database and returns the updated entity in the
     *      response.
     * @param {string} parentName Name of the parent entity.
     * @param {string} childName Name of the child entity.
     * @param {string} urlPath URL path of the request.
     */
    const addPatchRoute = (parentName, childName, urlPath) => {
        server.patch(urlPath, (req, res) => {
            const parentId = req.params[`${parentName}Id`];
            const childId = req.params[`${childName}Id`];
            const childRecord = Object.assign({}, req.body, {
                updatedBy: modifyingUser,
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

    const modifyingUser = {
        userId: 1,
        username: 'mike',
        fullName: 'Mike Rourke',
    };

    /**
     * Adds additional fields that would be generated by the server/database
     *      in production and removes fields that shouldn't be included in the
     *      update.
     * @param {string} parentName Name of the parent entity.
     * @param {string} childName Name of the child entity.
     * @param {Object} entity Entity from the request.
     * @returns {Object} Record entity with updated properties.
     */
    const getChildRecord = (parentName, childName, entity) => {
        const currentTime = getCurrentTime();
        let childRecord = Object.assign({}, entity, {
            id: getNewId(parentName, childName),
            createdBy: modifyingUser,
            createdAt: currentTime,
            updatedBy: modifyingUser,
            updatedAt: currentTime,
        });
        delete childRecord.typeName;
        return childRecord;
    };

    /**
     * Adds a route to the entity for handling POST requests, which creates
     *      the entity in the database and returns the created entity in the
     *      response.
     * @param {string} parentName Name of the parent entity.
     * @param {string} childName Name of the child entity.
     * @param {string} urlPath URL path of the request.
     */
    const addPostRoute = (parentName, childName, urlPath) => {
        server.post(urlPath, (req, res) => {
            const parentId = req.params[`${parentName}Id`];
            const childrenInDb = db
                .get(`${parentName}s`)
                .getById(parentId)
                .get(`${childName}s`);

            const bodyData = req.body;
            if (Array.isArray(bodyData)) {
                const childrenForResponse = [];
                bodyData.forEach((bodyItem) => {
                    const childItem =
                        getChildRecord(parentName, childName, bodyItem);
                    childrenInDb
                        .push(childItem)
                        .write();
                    childrenForResponse.push(childItem);
                });
                res.jsonp(childrenForResponse);
            } else {
                const singleItem =
                    getChildRecord(parentName, childName, bodyData);
                childrenInDb
                    .push(singleItem)
                    .write();
                res.jsonp(singleItem);
            }
        });
    };

    /**
     * Adds a route to the entity for handling DELETE requests, which deletes
     *      the entity in the database and returns the deleted entity in the
     *      response.
     * @param {string} parentName Name of the parent entity.
     * @param {string} childName Name of the child entity.
     * @param {string} urlPath URL path of the request.
     */
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

    /**
     * Returns the child objects associated with the lead specified in the
     *      parameters.  This is used to ensure the normalized data isn't
     *      pushed to the database.
     * @param {number} leadId ID number of the parent lead.
     * @returns {Object} Child entities associated with the lead.
     */
    const getLeadChildren = (leadId) => {
        const leadInDb = db.get('leads').getById(leadId);
        return {
            changes: leadInDb.get('changes').value(),
            messages: leadInDb.get('messages').value(),
            notes: leadInDb.get('notes').value()
        }
    };

    /**
     * Adds any custom route(s) to the Lead entity.
     */
    const addLeadRoutes = () => {
        server.delete('/leads/:leadId', (req, res) => {
            const leadId = parseInt(req.params['leadId'], 10);
            const deletedLead = db
                .get('leads')
                .find({ id: leadId })
                .value();

            db.get('leads')
                .remove({ id: leadId })
                .write();
            res.jsonp(deletedLead);
        });

        server.post('/leads', (req, res) => {
            const currentTime = getCurrentTime();
            const leadId = getNewId('lead');
            const leadRecord = Object.assign({}, req.body, {
                id: leadId,
                createdBy: modifyingUser,
                createdAt: currentTime,
                updatedBy: modifyingUser,
                updatedAt: currentTime,
            });
            db.get('leads')
                .push(leadRecord)
                .write();
            res.jsonp(leadRecord);
        });

        server.patch('/leads/:leadId', (req, res) => {
            const leadId = req.params['leadId'];
            const leadRecord = Object.assign({}, req.body, {
                updatedBy: modifyingUser,
                updatedAt: getCurrentTime(),
            }, getLeadChildren(leadId));
            delete leadRecord.typeName;
            db.get('leads')
                .getById(leadId)
                .assign(leadRecord)
                .write();
            res.jsonp(leadRecord);
        });
    };

    const getUserInDb = (userFromReq) => {
        const usersInDb = db
            .get('users')
            .value();
        return usersInDb.find(userInDb =>
            userInDb.username === userFromReq.username);
    };

    const addSessionRoutes = () => {
        server.post('/login', (req, res) => {
            const userFromReq = req.body;
            const userInDb = getUserInDb(userFromReq);
            if (userFromReq.password === userInDb.password) {
                delete userInDb.password;
                res.jsonp(userInDb);
            } else {
                res.status(401).send('Invalid password');
            }
        });

        server.post('/logout', (req, res) => {
            res.jsonp(getUserInDb(req));
        });
    };

    const addChildRoutes = () => {
        const childName = ['change', 'message', 'note'];
        childName.forEach(child => {
            const routeUrl = `/leads/:leadId/${child}s`;
            addGetRoute('lead', child, `${routeUrl}/:${child}Id`);
            addDeleteRoute('lead', child, `${routeUrl}/:${child}Id`);
            addPatchRoute('lead', child, `${routeUrl}/:${child}Id`);
            addPostRoute('lead', child, routeUrl);
        });
    };

    addLeadRoutes();
    addSessionRoutes();
    addChildRoutes();
    return server;
};
