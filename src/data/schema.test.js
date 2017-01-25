import { expect } from 'chai';
import { normalize } from 'normalizr';
import {
    leadSchema,
    settingSchema,
} from './schema';
import db from '../../tools/db.json';

describe('Schema', () => {
    it('Normalizes Lead entities', () => {
        const normalizedData = normalize(db.leads, leadSchema);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });

    it('Normalizes Settings entities', () => {
        const normalizedData = normalize(db.settings, settingSchema);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });
});
