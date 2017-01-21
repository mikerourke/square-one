import { expect } from 'chai';
import { normalize } from 'normalizr';
import {
    leadSchema,
    settingSchema,
} from './schema';
import db from '../../tools/db.json';

describe('Schema', () => {
    it('successfully normalizes lead entities', () => {
        const normalizedData = normalize(db.leads, leadSchema);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });

    it('successfully normalizes setting array entities', () => {
        const normalizedData = normalize(db.settings, settingSchema);
        console.log(normalizedData);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });
});
