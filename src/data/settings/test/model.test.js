import { expect } from 'chai';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import Setting, { settingSchema } from '../model';
import { mockDb } from '../../data.mock';

/**
 * Helper method that finds the specified setting in the mock database and
 *      converts it to an Immutable Record representing a Setting entity.
 * @param {string} settingName Name of the setting to search for in the file.
 * @returns {Setting}
 */
const getSettingFromName = (settingName) => {
    const settingFromDb = mockDb.settings.find(setting =>
        setting.settingName === settingName);
    return new Setting(fromJS(settingFromDb));
};

describe('Settings Model', () => {
    it('normalizes Settings entities', () => {
        const normalizedData = normalize(mockDb.settings, settingSchema);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });

    it('creates a Setting record', () => {
        const sources = getSettingFromName('sources');
        expect(sources.get('category')).to.equal('lists');
    });

    it('puts the "data" from a list Setting into an array', () => {
        const sources = getSettingFromName('sources');
        expect(sources.getData()).to.have.lengthOf(5);
    });

    it('puts the "data" from a non-list Setting into a valid object', () => {
        const companyInfo = getSettingFromName('companyInfo');
        expect(companyInfo.getData()).to.have.all.keys(
            [
                'companyName',
                'address',
                'phone',
            ]);
    });
});
