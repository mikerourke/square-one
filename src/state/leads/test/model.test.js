/* External dependencies */
import { normalize } from 'normalizr';

/* Internal dependencies */
import Lead, { leadSchema } from '../model';
import { mockDb } from '../../../../internals/testing/mock/for-state';

const getLeadFromId = (leadId) => {
    const leadFromDb = mockDb.leads.find(lead => lead.id === leadId);
    return new Lead(leadFromDb);
};

describe('Lead Model', () => {
    it('normalizes Lead entities', () => {
        const normalizedData = normalize(mockDb.leads, leadSchema);
        const expectedData = {
            "entities": {
                "leads": {
                    "1": {
                        "address": "123 Yorktown Shopping Center, Lombard, IL 60148, USA",
                        "assignTo": "Chuckles",
                        "contactName": "",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "description": "This is a lead",
                        "email": "steve@leads.com",
                        "id": 1,
                        "lat": 41.83931079999999,
                        "leadFee": 25,
                        "leadName": "Steve Leadsman",
                        "lng": -88.00729280000002,
                        "phone": "(630) 123-4567",
                        "source": "Other",
                        "status": "New",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "2": {
                        "address": "",
                        "assignTo": "",
                        "contactName": "",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "description": "This is another lead",
                        "email": "nancy@leads.com",
                        "id": 2,
                        "lat": 0,
                        "leadFee": 25,
                        "leadName": "Nancy Leadelstein",
                        "lng": 0,
                        "phone": "(630) 123-4567",
                        "source": "Saw Sign",
                        "status": "Existing",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "3": {
                        "address": "",
                        "assignTo": "",
                        "contactName": "",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "description": "This is a third lead",
                        "email": "paco@leads.com",
                        "id": 3,
                        "lat": 0,
                        "leadFee": 25,
                        "leadName": "Paco Leadrojo",
                        "lng": 0,
                        "phone": "(630) 123-4567",
                        "source": "Saw Sign",
                        "status": "New",
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
            "contactName": "",
            "createdAt": "2017-02-02 14:53:35.764000",
            "description": "This is a lead",
            "email": "steve@leads.com",
            "id": 1,
            "lat": 41.83931079999999,
            "leadFee": 25,
            "leadName": "Steve Leadsman",
            "lng": -88.00729280000002,
            "phone": "(630) 123-4567",
            "source": "Other",
            "status": "New",
            "updatedAt": "2017-02-02 14:53:35.764000"
        };
        expect(leadRecord.toJS()).toEqual(expectedObject);
    });
});
