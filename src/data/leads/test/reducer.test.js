import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import Lead, { leadSchema } from '../model';
import { normalize } from 'normalizr';
import mockDb from '../../../../tools/api/db.json';

describe('Lead Reducer', () => {
    it('Should create a map of records', () => {
        const normalizedData = normalize(mockDb.leads, leadSchema);
    });
});
