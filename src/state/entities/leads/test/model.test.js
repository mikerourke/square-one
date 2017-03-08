/* External dependencies */
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';

/* Internal dependencies */
import Lead from '../model';
import { leadsSchema } from '../../schema';

export const mockData = [{
        "id": 1,
        "leadName": "Steve Leadsman",
        "contactName": "",
        "source": "Facebook",
        "leadFee": 25,
        "phone": "(630) 123-4567",
        "email": "steve@leads.com",
        "address": "123 Yorktown Shopping Center, Lombard, IL 60148, USA",
        "lat": 41.83931079999999,
        "lng": -88.00729280000002,
        "description": "This is a lead",
        "status": "New",
        "assignTo": "Chuckles",
        "notes": [{
                "id": 1,
                "title": "Example Note",
                "details": "Note details",
                "isPrivate": false,
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            },
            {
                "id": 2,
                "title": "Example Note 2",
                "details": "Note details 2",
                "isPrivate": true,
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }
        ],
        "changes": [{
                "id": 1,
                "changeType": "create",
                "iconName": "add_circle_outline",
                "title": "Example Change",
                "details": "Change details",
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            },
            {
                "id": 2,
                "changeType": "sendMessage",
                "iconName": "contact_mail",
                "title": "Example Change 2",
                "details": "Change details 2",
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }
        ],
        "createdAt": "2017-02-02 14:53:35.764000",
        "updatedAt": "2017-02-02 14:53:35.764000"
    },
    {
        "id": 2,
        "leadName": "Nancy Leadelstein",
        "contactName": "",
        "source": "Saw Sign",
        "leadFee": 25,
        "phone": "(630) 123-4567",
        "email": "nancy@leads.com",
        "address": "",
        "lat": 0,
        "lng": 0,
        "description": "This is another lead",
        "status": "Existing",
        "assignTo": "",
        "notes": [{
                "id": 3,
                "title": "Example Note",
                "details": "Note details",
                "isPrivate": false,
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            },
            {
                "id": 4,
                "title": "Example Note 2",
                "details": "Note details 2",
                "isPrivate": true,
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }
        ],
        "changes": [{
                "id": 3,
                "changeType": "create",
                "iconName": "add_circle_outline",
                "title": "Example Change",
                "details": "Change details",
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            },
            {
                "id": 4,
                "changeType": "sendMessage",
                "iconName": "contact_mail",
                "title": "Example Change 2",
                "details": "Change details 2",
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }
        ],
        "createdAt": "2017-02-02 14:53:35.764000",
        "updatedAt": "2017-02-02 14:53:35.764000"
    },
    {
        "id": 3,
        "leadName": "Paco Leadrojo",
        "contactName": "",
        "source": "Saw Sign",
        "leadFee": 25,
        "phone": "(630) 123-4567",
        "email": "paco@leads.com",
        "address": "",
        "lat": 0,
        "lng": 0,
        "description": "This is a third lead",
        "status": "New",
        "assignTo": "",
        "notes": [{
                "id": 5,
                "title": "Example Note",
                "details": "Note details",
                "isPrivate": false,
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            },
            {
                "id": 6,
                "title": "Example Note 2",
                "details": "Note details 2",
                "isPrivate": true,
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }
        ],
        "changes": [{
                "id": 5,
                "changeType": "create",
                "iconName": "add_circle_outline",
                "title": "Example Change",
                "details": "Change details",
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            },
            {
                "id": 6,
                "changeType": "sendMessage",
                "iconName": "contact_mail",
                "title": "Example Change 2",
                "details": "Change details 2",
                "createdBy": "mike",
                "createdAt": "2017-02-02 14:53:35.764000",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }
        ],
        "createdAt": "2017-02-02 14:53:35.764000",
        "updatedAt": "2017-02-02 14:53:35.764000"
    }
]

const getLeadFromId = (leadId) => {
    const leadFromDb = mockData.find(lead => lead.id === leadId);
    return new Lead(fromJS(leadFromDb));
};

describe('Lead Model', () => {
    it('normalizes Lead entities', () => {
        const normalizedData = normalize(mockData, leadsSchema);
        const expectedData = {
            "entities": {
                "changes": {
                    "1": {
                        "changeType": "create",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details",
                        "iconName": "add_circle_outline",
                        "id": 1,
                        "leadId": 1,
                        "title": "Example Change",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "2": {
                        "changeType": "sendMessage",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details 2",
                        "iconName": "contact_mail",
                        "id": 2,
                        "leadId": 1,
                        "title": "Example Change 2",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "3": {
                        "changeType": "create",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details",
                        "iconName": "add_circle_outline",
                        "id": 3,
                        "leadId": 2,
                        "title": "Example Change",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "4": {
                        "changeType": "sendMessage",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details 2",
                        "iconName": "contact_mail",
                        "id": 4,
                        "leadId": 2,
                        "title": "Example Change 2",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "5": {
                        "changeType": "create",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details",
                        "iconName": "add_circle_outline",
                        "id": 5,
                        "leadId": 3,
                        "title": "Example Change",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "6": {
                        "changeType": "sendMessage",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details 2",
                        "iconName": "contact_mail",
                        "id": 6,
                        "leadId": 3,
                        "title": "Example Change 2",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    }
                },
                "leads": {
                    "1": {
                        "address": "123 Yorktown Shopping Center, Lombard, IL 60148, USA",
                        "assignTo": "Chuckles",
                        "changes": [1, 2],
                        "contactName": "",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "description": "This is a lead",
                        "email": "steve@leads.com",
                        "id": 1,
                        "lat": 41.83931079999999,
                        "leadFee": 25,
                        "leadName": "Steve Leadsman",
                        "lng": -88.00729280000002,
                        "notes": [1, 2],
                        "phone": "(630) 123-4567",
                        "source": "Facebook",
                        "status": "New",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "2": {
                        "address": "",
                        "assignTo": "",
                        "changes": [3, 4],
                        "contactName": "",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "description": "This is another lead",
                        "email": "nancy@leads.com",
                        "id": 2,
                        "lat": 0,
                        "leadFee": 25,
                        "leadName": "Nancy Leadelstein",
                        "lng": 0,
                        "notes": [3, 4],
                        "phone": "(630) 123-4567",
                        "source": "Saw Sign",
                        "status": "Existing",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "3": {
                        "address": "",
                        "assignTo": "",
                        "changes": [5, 6],
                        "contactName": "",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "description": "This is a third lead",
                        "email": "paco@leads.com",
                        "id": 3,
                        "lat": 0,
                        "leadFee": 25,
                        "leadName": "Paco Leadrojo",
                        "lng": 0,
                        "notes": [5, 6],
                        "phone": "(630) 123-4567",
                        "source": "Saw Sign",
                        "status": "New",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    }
                },
                "notes": {
                    "1": {
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Note details",
                        "id": 1,
                        "isPrivate": false,
                        "leadId": 1,
                        "title": "Example Note",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "2": {
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Note details 2",
                        "id": 2,
                        "isPrivate": true,
                        "leadId": 1,
                        "title": "Example Note 2",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "3": {
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Note details",
                        "id": 3,
                        "isPrivate": false,
                        "leadId": 2,
                        "title": "Example Note",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "4": {
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Note details 2",
                        "id": 4,
                        "isPrivate": true,
                        "leadId": 2,
                        "title": "Example Note 2",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "5": {
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Note details",
                        "id": 5,
                        "isPrivate": false,
                        "leadId": 3,
                        "title": "Example Note",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "6": {
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Note details 2",
                        "id": 6,
                        "isPrivate": true,
                        "leadId": 3,
                        "title": "Example Note 2",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    }
                }
            },
            "result": [1, 2, 3]
        };
        expect(normalizedData).toEqual(expectedData);
    });

    it('successfully creates a Lead record', () => {
        const leadRecord = getLeadFromId(1);
        const expectedObject = {
            "address": "123 Yorktown Shopping Center, Lombard, IL 60148, USA",
            "assignTo": "Chuckles",
            "changes": [{
                "changeType": "create",
                "createdAt": "2017-02-02 14:53:35.764000",
                "createdBy": "mike",
                "details": "Change details",
                "iconName": "add_circle_outline",
                "id": 1,
                "title": "Example Change",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }, {
                "changeType": "sendMessage",
                "createdAt": "2017-02-02 14:53:35.764000",
                "createdBy": "mike",
                "details": "Change details 2",
                "iconName": "contact_mail",
                "id": 2,
                "title": "Example Change 2",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }],
            "contactName": "",
            "createdAt": "2017-02-02 14:53:35.764000",
            "description": "This is a lead",
            "email": "steve@leads.com",
            "id": 1,
            "lat": 41.83931079999999,
            "leadFee": 25,
            "leadName": "Steve Leadsman",
            "lng": -88.00729280000002,
            "notes": [{
                "createdAt": "2017-02-02 14:53:35.764000",
                "createdBy": "mike",
                "details": "Note details",
                "id": 1,
                "isPrivate": false,
                "title": "Example Note",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }, {
                "createdAt": "2017-02-02 14:53:35.764000",
                "createdBy": "mike",
                "details": "Note details 2",
                "id": 2,
                "isPrivate": true,
                "title": "Example Note 2",
                "updatedAt": "2017-02-02 14:53:35.764000"
            }],
            "phone": "(630) 123-4567",
            "source": "Facebook",
            "status": "New",
            "updatedAt": "2017-02-02 14:53:35.764000"
        };
        expect(leadRecord.toJS()).toEqual(expectedObject);
    });
});
