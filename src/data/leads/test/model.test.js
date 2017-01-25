import { expect } from 'chai';
import { fromJS } from 'immutable';
import Lead from '../model';
import db from '../../../../tools/db.json';

/**
 * Helper method that finds the specified lead in the db.json file and
 *      converts it to an Immutable Record representing a Lead entity.
 * @param {number} leadId Id number of the lead to find.
 * @returns {Record}
 */
const getLeadFromId = (leadId) => {
    const leadFromDb = db.leads.find(lead => lead.id === leadId);
    return new Lead(fromJS(leadFromDb));
};

describe('Lead Model', () => {
    it('Successfully creates a Lead record', () => {
        const leadRecord = getLeadFromId(1);
        expect(leadRecord.get('source')).to.equal('Other');
    });

    it('Puts the appointments from a Lead into an array of objects', () => {
        const leadRecord = getLeadFromId(1);
        expect(leadRecord.getAppointments()).to.have.lengthOf(1);
    });
});
