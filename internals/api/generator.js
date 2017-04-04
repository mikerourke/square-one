/**
 * Generates data based on a specified schema for testing in the application.
 */

const path = require('path');
const { blue, cyan, green, red } = require('chalk');
const jsf = require('json-schema-faker');
const jsonFile = require('jsonfile');
const moment = require('moment');

// JSON files associated with data generation:
const schema = require('./schema.json');
const dbFilePath = path.resolve(process.cwd(), 'internals/api/db.json');
const staticFilePath = path.resolve(process.cwd(), 'internals/api/static.json');

/**
 * Converts the UNIX timestamp value that was generated to a readable date
 *      format in the generated data file.
 * @param {number} timeToFormat Unix time to format.
 * @returns {string} Formatted date/time.
 */
const getFormattedTime = (timeToFormat) =>
    moment.unix(timeToFormat).format('YYYY-MM-DD HH:mm:ss');

/**
 * Finds the user object that matches the specified user name and returns the
 *      fields to represent the user object in the database.
 * @param {Array} users Users from the static.json file.
 * @param {string} userNameFromEntity User name to find.
 * @returns {Object} User object to populate in the database.
 */
const getUserByUserName = (
    users,
    userNameFromEntity
) => {
    const userInDb = users.find(user => user.username === userNameFromEntity);
    const { id, username, fullName } = userInDb;
    return {
        id,
        username,
        fullName
    };
};

/**
 * Replaces the user name for the createdBy and updatedBy fields in the database
 *      with an object representing the user.
 * @param {Array} users Users from the static.json file.
 * @param {Object} entity Entity to update.
 * @param {number} nextId ID number to assign to the entity.
 * @returns {Object} Updated entity.
 */
const getUpdatedEntity = (
    users,
    entity,
    nextId
) => Object.assign({}, entity, {
    id: nextId,
    createdBy: getUserByUserName(users, entity.createdBy),
    createdAt: getFormattedTime(entity.createdAt),
    updatedBy: getUserByUserName(users, entity.updatedBy),
    updatedAt: getFormattedTime(entity.updatedAt)
});

/**
 * Returns the starting for each entity based on the current date.
 * @param {number} entitySequence Start of the ID number based on entity type.
 * @returns {number} ID number to start with.
 */
const getIdForDate = (entitySequence) => {
    const dateSeq = moment().format('YYMMDD');
    const idString = `${entitySequence}${dateSeq}0000`;
    return parseInt(idString, 10);
};

/**
 * Updates the ID of the entities to match the custom format indicating the
 *      entity type.
 * @param {Array} parents Array of parent entities to update.
 * @param {Object} staticData Data from the static.json file.
 * @returns {Promise} Promise that resolves with array of updated parents.
 */
const updateEntities = (
    parents,
    staticData
) => new Promise((resolve) => {
    const { users } = staticData;
    let parentId = getIdForDate(101);
    let changeId = getIdForDate(102);
    let messageId = getIdForDate(103);
    let noteId = getIdForDate(104);
    const updatedParents = parents.map((parent) => {
        const { changes, messages, notes } = parent;
        parent.changes = changes.map(
            change => getUpdatedEntity(users, change, changeId += 1));

        parent.messages = messages.map(
            message => getUpdatedEntity(users, message, messageId += 1));

        parent.notes = notes.map(
            note => getUpdatedEntity(users, note, noteId += 1));

        return getUpdatedEntity(users, parent, parentId += 1);
    });
    resolve(updatedParents);
});

/**
 * Generates data based on the specified schema and formats the time fields to
 *      be in a usable format.
 * @param {Object} staticData Data from existing static.json file.
 * @param {string} entityGroupName Name of the entity to get schema for.
 */
const getFormattedSampleData = (
    staticData,
    entityGroupName
) =>
    new Promise((resolve, reject) => {
        const sampleEntities = jsf(schema[entityGroupName]);
        updateEntities(sampleEntities, staticData)
            .then(updatedEntities => resolve(updatedEntities))
            .catch(err => reject(err));
    });

/**
 * Writes the specified data (as a JSON object) to the specified file path and
 *      returns a promise when complete.
 * @param {string} filePath Path of the file to write to.
 * @param {Object} dataToWrite JSON object to write to the file.
 * @returns {Promise}
 */
const writeDataToJsonFile = (
    filePath,
    dataToWrite
) =>
    new Promise((resolve, reject) => {
        const fileName = path.basename(filePath);
        jsonFile.writeFile(filePath, dataToWrite, { spaces: 2 }, (err) => {
            if (err) {
                console.log(red(`Error writing data to file: ${err}`));
                reject();
            }
            console.log(blue(`Successfully wrote to file: ${fileName}`));
            resolve();
        });
    });

/**
 * Writes the result of the generated data to the db.json file.
 * @param {Object} staticData Data present in the static.json file.
 * @returns {Promise}
 */
const writeGeneratedDataToFile = (staticData) =>
    new Promise((resolve, reject) => {
        console.log(cyan('Generating sample data...'));
        getFormattedSampleData(staticData, 'leads').then((formattedData) => {
            const dataToWrite = Object.assign({}, staticData, {
                leads: formattedData
            });

            console.log(cyan('Writing data to file...'));
            writeDataToJsonFile(dbFilePath, dataToWrite)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    });

/**
 * Reads the contents of the static.json file and returns a promise with the
 *      content as the resolution.
 * @returns {Promise}
 */
const getStaticDbContent = () =>
    new Promise((resolve, reject) => {
        jsonFile.readFile(staticFilePath, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        });
    });

getStaticDbContent()
    .then(writeGeneratedDataToFile)
    .then(() => console.log(green('Data generation complete.')));

