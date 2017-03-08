const { blue, green, red } = require('chalk');
const jsf = require('json-schema-faker');
const jsonFile = require('jsonfile');
const moment = require('moment');

const currentDb = require('./db.json');

const MIN_ITEMS = 10;
const MAX_ITEMS = 10;

const leadsSchema = {
    type: 'array',
    minItems: MIN_ITEMS,
    maxItems: MAX_ITEMS,
    items: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                minimum: 0,
                exclusiveMinimum: true
            },
            leadName: {
                type: 'string',
                faker: 'name.findName'
            },
            contactName: {
                type: 'string',
                faker: 'name.findName'
            },
            source: {
                type: 'string',
                pattern: 'Did work in area|Facebook|Flyer|' +
                         'Home Advisor|Saw Sign'
            },
            leadFee: {
                type: 'integer',
                faker: 'finance.amount'
            },
            phone: {
                type: 'string',
                faker: 'phone.phoneNumber'
            },
            email: {
                type: 'string',
                format: 'email',
                faker: 'internet.email'
            },
            address: {
                type: 'string',
                faker: 'address.streetAddress'
            },
            lat: {
                type: 'number',
                faker: 'address.latitude'
            },
            lng: {
                type: 'number',
                faker: 'address.longitude'
            },
            description: {
                type: 'string',
                faker: 'lorem.sentence'
            },
            status: {
                type: 'string',
                pattern: 'New|Selling|Won|Qualified|Lost'
            },
            assignTo: {
                type: 'string',
                pattern: 'Scott|Chuckles|Biscuits'
            },
            notes: {
                type: 'array',
                minItems: MIN_ITEMS,
                maxItems: MAX_ITEMS,
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            minimum: 0,
                            exclusiveMinimum: true
                        },
                        title: {
                            type: 'string',
                            faker: 'lorem.sentence'
                        },
                        details: {
                            type: 'string',
                            faker: 'lorem.paragraph'
                        },
                        isPrivate: {
                            type: 'boolean'
                        },
                        createdBy: {
                            type: 'string',
                            faker: 'internet.userName'
                        },
                        createdAt: {
                            type: 'string',
                            chance: 'timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            chance: 'timestamp'
                        }
                    },
                    required: ['id', 'title', 'details', 'isPrivate',
                               'createdBy', 'createdAt', 'updatedAt']
                }
            },
            changes: {
                type: 'array',
                minItems: MIN_ITEMS,
                maxItems: MAX_ITEMS,
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            minimum: 0,
                            exclusiveMinimum: true
                        },
                        changeType: {
                            type: 'string',
                            pattern: 'create|update'
                        },
                        iconName: {
                            type: 'string',
                            pattern: 'add_circle_outline|contact_mail|' +
                                     'contact_phone'
                        },
                        title: {
                            type: 'string',
                            faker: 'lorem.sentence'
                        },
                        details: {
                            type: 'string',
                            faker: 'lorem.paragraph'
                        },
                        createdBy: {
                            type: 'string',
                            faker: 'internet.userName'
                        },
                        createdAt: {
                            type: 'string',
                            chance: 'timestamp'
                        },
                        updatedAt: {
                            type: 'string',
                            chance: 'timestamp'
                        }
                    },
                    required: ['id', 'changeType', 'iconName', 'title',
                               'details', 'createdBy', 'createdAt', 'updatedAt']
                }
            },
            createdAt: {
                type: 'string',
                chance: 'timestamp'
            },
            updatedAt: {
                type: 'string',
                chance: 'timestamp'
            }
        },
        required: ['id', 'leadName', 'contactName', 'source', 'leadFee',
                   'phone', 'email', 'address', 'lat', 'lng',
                   'description', 'status', 'assignTo', 'notes', 'changes',
                   'createdAt', 'updatedAt'],
    }
};

const getFormattedTime = (timeToFormat) => {
    const timeInMs = parseInt(timeToFormat, 10);
    const newFormat = 'YYYY-MM-DD HH:mm:ss';
    return moment(timeInMs).format(newFormat);
};

const updateTimeFormat = (entityGroup) => entityGroup.map(entityItem => {
    entityItem.createdAt = getFormattedTime(entityItem.createdAt);
    entityItem.updatedAt = getFormattedTime(entityItem.updatedAt);
});

const getFormattedSampleData = () => {
    const sampleLeads = jsf(leadsSchema);
    updateTimeFormat(sampleLeads);
    sampleLeads.map(sampleLead => {
        updateTimeFormat(sampleLead.changes);
        updateTimeFormat(sampleLead.notes);
    });
    return sampleLeads;
};

const writeDataToJsonFile = (filePath, dataToWrite) => {
    return new Promise((resolve, reject) => {
        jsonFile.writeFile(filePath, dataToWrite, { spaces: 2 }, (err) => {
            if (err) {
                console.log(red(`Error writing data to file: ${err}`));
                reject();
            }
            console.log(blue(`Successfully wrote to file: ${filePath}`));
            resolve();
        });
    });
};

const writeGeneratedDataToFile = (existingData) => {
    return new Promise((resolve, reject) => {
        const dataToWrite = Object.assign({}, existingData, {
            leads: getFormattedSampleData()
        });
        writeDataToJsonFile(dbFilePath, dataToWrite)
            .then(() => resolve())
            .catch(err => reject(err));
    });
};

const dbFilePath = `${__dirname}\\db.json`;

const backupExistingData = (existingData) => {
    return new Promise((resolve, reject) => {
        const backupFilePath = `${__dirname}\\backup.json`;
        writeDataToJsonFile(backupFilePath, existingData)
            .then(() => resolve(existingData))
            .catch(err => reject(err));
    });
};

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

