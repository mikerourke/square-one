/* External dependencies */
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';

/* Internal dependencies */
import Setting, { settingSchema } from '../model';
import { mockDb } from '../../../../internals/testing/mock/for-state';

/**
 * Helper method that finds the specified setting in the mock database and
 *      converts it to an Immutable Record representing a Setting entity.
 */
const getSettingFromName = (settingName) => {
    const settingFromDb = mockDb.settings.find(setting =>
        setting.settingName === settingName);
    return new Setting(fromJS(settingFromDb));
};

describe('Settings Model', () => {
    it('normalizes Settings entities', () => {
        const normalizedData = normalize(mockDb.settings, settingSchema);
        const expectedData = {
            "entities": {
                "settings": {
                "companyInfo": {
                    "category": "general",
                    "data": {
                    "address": "123 Company Lane",
                    "companyName": "Legend",
                    "phone": "(630) 123-5555"
                    },
                    "id": 3,
                    "settingName": "companyInfo"
                },
                "leadStatuses": {
                    "category": "lists",
                    "data": [
                    { "id": 1, "value": "New" },
                    { "id": 2, "value": "Selling" },
                    { "id": 3, "value": "Won" },
                    { "id": 4, "value": "Qualified" },
                    { "id": 5, "value": "Lost"}],
                    "id": 2,
                    "settingName": "leadStatuses"
                },
                "sources": {
                    "category": "lists",
                    "data": [
                    { "id": 1, "value": "Did work in area" },
                    { "id": 2, "value": "Facebook" },
                    { "id": 3, "value": "Flyer" },
                    { "id": 4, "value": "HomeAdvisor" },
                    { "id": 5, "value": "Saw Sign" }],
                    "id": 1,
                    "settingName": "sources"
                }
                }
            },
            "result": ["sources", "leadStatuses", "companyInfo"]
        }
        expect(normalizedData).toEqual(expectedData);
    });

    it('creates a Setting record', () => {
        const sources = getSettingFromName('sources');
        expect(sources.get('category')).toEqual('lists');
    });

    it('puts the "data" from a list Setting into an array', () => {
        const sources = getSettingFromName('sources');
        expect(sources.getData()).toHaveLength(5);
    });

    it('puts the "data" from a non-list Setting into a valid object', () => {
        const companyInfo = getSettingFromName('companyInfo');
        const expectedData = {
            "address": "123 Company Lane",
            "companyName": "Legend",
            "phone": "(630) 123-5555"
        }
        expect(companyInfo.getData()).toEqual(expectedData);
    });
});
