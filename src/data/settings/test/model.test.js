import { expect } from 'chai';
import { fromJS } from 'immutable';
import Setting from '../model';
import db from '../../../../tools/db.json';

/**
 * Helper method that finds the specified setting in the db.json file and
 *      converts it to an Immutable Record representing a Setting entity.
 * @param {string} settingName Name of the setting to search for in the file.
 * @returns {Record}
 */
const getSettingFromName = (settingName) => {
    const settingFromDb = db.settings.find(setting =>
        setting.settingName === settingName);
    return new Setting(fromJS(settingFromDb));
};

describe('Settings Model', () => {
    it('Successfully creates a Setting record', () => {
        const sources = getSettingFromName('sources');
        expect(sources.get('category')).to.equal('lists');
    });

    it('Puts the "data" from a list Setting into an array', () => {
        const sources = getSettingFromName('sources');
        expect(sources.getData()).to.have.lengthOf(5);
    });

    it('Puts the "data" from a non-list Setting into a valid object', () => {
        const companyInfo = getSettingFromName('companyInfo');
        expect(companyInfo.getData()).to.have.all.keys(
            [
                'companyName',
                'address',
                'phone',
            ]);
    });
});
