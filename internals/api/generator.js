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
const backupFilePath = path.resolve(process.cwd(), 'internals/api/backup.json');
const dbFilePath = path.resolve(process.cwd(), 'internals/api/db.json');

/**
 * Converts the UNIX timestamp value that was generated to a readable date
 *      format in the generated data file.
 * @param {number} timeToFormat Unix time to format.
 * @returns {string} Formatted date/time.
 */
const getFormattedTime = (timeToFormat) =>
    moment.unix(timeToFormat).format('YYYY-MM-DD HH:mm:ss.SSS Z');

/**
 * Loops through each entity in the specified entity group and updates the
 *      created and updated dates to the formatted time.
 * @param {Array} entityGroup Group of entities with times that need to be
 *      formatted.
 */
const updateTimeFormat = (entityGroup) => entityGroup.map(entityItem => {
    entityItem.createdAt = getFormattedTime(entityItem.createdAt);
    entityItem.updatedAt = getFormattedTime(entityItem.updatedAt);
});

/**
 * Updates the ID of the entities to match the custom format indicating the
 *      entity type.
 * @param {Array} leads Array of lead entities to update.
 * @returns {Array} Updated lead entities.
 */
const updateIdsToMatchCustomFormat = (leads) => {
    let leadCounter = 1;
    let changeCounter = 1;
    let messageCounter = 1;
    let noteCounter = 1;
    leads.forEach((lead) => {
        lead.id = 1011703210000 + leadCounter;
        lead.changes.forEach((changes) => {
            changes.id = 1021703210000 + changeCounter;
            changeCounter += 1;
        });

        lead.messages.forEach((message) => {
            message.id = 1041703210000 + messageCounter;
            messageCounter += 1;
        });

        lead.notes.forEach((note) => {
            note.id = 1031703210000 + noteCounter;
            noteCounter += 1;
        });
        leadCounter += 1;
    });
    return leads;
};

/**
 * Generates data based on the specified schema and formats the time fields to
 *      be in a usable format.
 */
const getFormattedSampleData = () => {
    const sampleLeads = jsf(schema.leads);
    updateTimeFormat(sampleLeads);
    sampleLeads.map(sampleLead => {
        updateTimeFormat(sampleLead.changes);
        updateTimeFormat(sampleLead.notes);
    });
    updateIdsToMatchCustomFormat(sampleLeads);
    return sampleLeads;
};

/**
 * Writes the specified data (as a JSON object) to the specified file path and
 *      returns a promise when complete.
 * @param {string} filePath Path of the file to write to.
 * @param {Object} dataToWrite JSON object to write to the file.
 * @returns {Promise}
 */
const writeDataToJsonFile = (filePath, dataToWrite) => {
    return new Promise((resolve, reject) => {
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
};

/**
 * Writes the result of the generated data to the db.json file.
 * @param {Object} existingData Data present in the existing db.json.
 * @returns {Promise}
 */
const writeGeneratedDataToFile = (existingData) => {
    return new Promise((resolve, reject) => {
        console.log(cyan('Generating sample data...'));
        delete existingData.leads;
        const dataToWrite = Object.assign({}, existingData, {
            leads: getFormattedSampleData()
        });
        console.log(cyan('Writing data to file...'));
        writeDataToJsonFile(dbFilePath, dataToWrite)
            .then(() => resolve())
            .catch(err => reject(err));
    });
};

/**
 * Copies the data from db.json to a backup file in case errors occur.
 * @param {Object} existingData Data present in the existing db.json.
 * @returns {Promise}
 */
const backupExistingData = (existingData) => {
    return new Promise((resolve, reject) => {
        console.log(cyan('Backing up existing data...'));
        writeDataToJsonFile(backupFilePath, existingData)
            .then(() => resolve(existingData))
            .catch(err => reject(err));
    });
};

/**
 * Reads the contents of the db.json file and returns a promise with the
 *      content as the resolution.
 * @returns {Promise}
 */
const getCurrentDbFileContent = () => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile(dbFilePath, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        });
    });
};

getCurrentDbFileContent()
    .then(backupExistingData)
    .then(writeGeneratedDataToFile)
    .then(() => console.log(green('Data generation complete.')));

