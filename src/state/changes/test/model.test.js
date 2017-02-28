/* External dependencies */
import { normalize } from 'normalizr';

/* Internal dependencies */
import Change, { changeSchema } from '../model';
import { mockDb } from '../../../../internals/testing/mock/for-state';

const getChangeFromId = (changeId) => {
    const changeFromDb = mockDb.changes.find(change => change.id === changeId);
    return new Change(changeFromDb);
};

describe('Change Model', () => {
    it('normalizes Change entities', () => {
        const normalizedData = normalize(mockDb.changes, changeSchema);
        const expectedData = {
            "entities": {
                "changes": {
                    "1": {
                        "changeType": "Create",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details",
                        "entityId": 1,
                        "entityType": "lead",
                        "id": 1,
                        "title": "Example Change",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    },
                    "2": {
                        "changeType": "Contact",
                        "createdAt": "2017-02-02 14:53:35.764000",
                        "createdBy": "mike",
                        "details": "Change details 2",
                        "entityId": 1,
                        "entityType": "lead",
                        "id": 2,
                        "title": "Example Change 2",
                        "updatedAt": "2017-02-02 14:53:35.764000"
                    }
                }
            },
            "result": [1, 2]
        };
        expect(normalizedData).toEqual(expectedData);
    });

    it('successfully creates a Change record', () => {
        const changeRecord = getChangeFromId(1);
        const expectedObject = {
            "changeType": "Create",
            "createdAt": "2017-02-02 14:53:35.764000",
            "createdBy": "mike",
            "details": "Change details",
            "entityId": 1,
            "entityType": "lead",
            "id": 1,
            "title": "Example Change",
            "updatedAt": "2017-02-02 14:53:35.764000"
        };
        expect(changeRecord.toJS()).toEqual(expectedObject);
    });
});
