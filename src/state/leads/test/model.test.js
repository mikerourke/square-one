/* External dependencies */
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';

/* Internal dependencies */
import Lead, { leadSchema } from '../model';
import { mockDb } from '../../../../internals/testing/mock/for-state';

/**
 * Helper method that finds the specified lead in the mock database and
 *      converts it to an Immutable Record representing a Lead entity.
 */
const getLeadFromId = (leadId) => {
    const leadFromDb = mockDb.leads.find(lead => lead.id === leadId);
    return new Lead(fromJS(leadFromDb));
};

describe('Lead Model', () => {
    it('normalizes Lead entities', () => {
        const normalizedData = normalize(mockDb.leads, leadSchema);
        const expectedData = {
            "entities": {
                "leads": {
                "1": {
                    "address": "123 Yorktown Shopping Center, Lombard, IL 60148, USA",
                    "description": "This is a lead",
                    "email": "steve@leads.com",
                    "id": 1,
                    "lat": 41.83931079999999,
                    "leadFee": 25,
                    "leadName": "Steve Leadsman",
                    "lng": -88.00729280000002,
                    "phone": "(630) 123-4567",
                    "source": "Other",
                    "status": "New"
                },
                "2": {
                    "address": "",
                    "description": "This is another lead",
                    "email": "nancy@leads.com",
                    "id": 2,
                    "lat": 0,
                    "leadFee": 25,
                    "leadName": "Nancy Leadelstein",
                    "lng": 0,
                    "phone": "(630) 123-4567",
                    "source": "Saw Sign",
                    "status": "Existing"
                },
                "3": {
                    "address": "",
                    "description": "This is a third lead",
                    "email": "paco@leads.com",
                    "id": 3,
                    "lat": 0,
                    "leadFee": 25,
                    "leadName": "Paco Leadrojo",
                    "lng": 0,
                    "phone": "(630) 123-4567",
                    "source": "Saw Sign",
                    "status": "New"
                }
                }
            },
            "result": [1, 2, 3]
            }
        expect(normalizedData).toEqual(expectedData);
    });

    it('successfully creates a Lead record', () => {
        const leadRecord = getLeadFromId(1);
        expect(leadRecord.source).toEqual('Other');
    });
});
