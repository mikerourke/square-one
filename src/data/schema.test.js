import { expect } from 'chai';
import { normalize } from 'normalizr';
import {
    leadSchema,
    listItemSchema,
} from './schema';
import db from '../../tools/db.json';

describe('Schema', () => {
    const normalizeData = (entityName, schema) => {
        const result = normalize(db[entityName], schema);
        console.log(result);
        return result;
    };

    it('Successfully normalizes lead entities', () => {
        const normalizedData = normalizeData('leads', leadSchema);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });

    it('Successfully normalizes list entities', () => {
        const normalizedData = normalizeData('lists', listItemSchema);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });

    it('Sucessfully normalizes sources', () => {
        const normalizedData = 'test';
        console.log(db.lists['1'].items);
    })
});
