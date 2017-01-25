import { expect } from 'chai';
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import Lead, { leadSchema } from '../model';
import mockDb from '../../../../tools/api/db.json';

/**
 * Helper method that finds the specified lead in the db.json file and
 *      converts it to an Immutable Record representing a Lead entity.
 * @param {number} leadId Id number of the lead to find.
 * @returns {Record}
 */
const getLeadFromId = (leadId) => {
    const leadFromDb = mockDb.leads.find(lead => lead.id === leadId);
    return new Lead(fromJS(leadFromDb));
};

describe('Lead Model', () => {
    it('Normalizes Lead entities', () => {
        const normalizedData = normalize(mockDb.leads, leadSchema);
        expect(normalizedData).to.contain.all.keys(['entities', 'result']);
    });

    it('Successfully creates a Lead record', () => {
        const leadRecord = getLeadFromId(1);
        expect(leadRecord.get('source')).to.equal('Other');
    });

    it('Puts the appointments from a Lead into an array of objects', () => {
        const leadRecord = getLeadFromId(1);
        expect(leadRecord.getAppointments()).to.have.lengthOf(1);
    });
});
