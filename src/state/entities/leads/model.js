/* @flow */

/* External dependencies */
import { List, Record } from 'immutable';

/* Internal dependencies */
import compareRecords from 'lib/compare-records';

/* Types */
import type { RecordDiff } from 'lib/types';

export default class Lead extends Record({
    id: (0: number),
    leadName: ('': string),
    contactName: ('': string),
    source: ('': string),
    leadFee: (0: number),
    phone: ('': string),
    email: ('': string),
    address: ('': string),
    lat: (0: number),
    lng: (0: number),
    description: ('': string),
    status: ('New': string),
    assignTo: ('': string),
    changes: (new List(): List<number>),
    messages: (new List(): List<number>),
    notes: (new List(): List<number>),
    createdBy: (new Map(): Map<string, any>),
    createdAt: (null: ?Date),
    updatedBy: (new Map(): Map<string, any>),
    updatedAt: (null: ?Date),
    typeName: ('lead': string),
}) {
    /**
     * Compares the property values of this instance to the property values
     *      of the specified Lead and returns any items that don't match.
     * @param {Lead} lead Lead to compare values with.
     * @returns {Array} Array of items that don't match.
     */
    getDifferences(lead: Lead): Array<RecordDiff> {
        return compareRecords(this, lead);
    }

    getEntityForApiCall() {
        const lead = this.toJS();
        return {
            id: +lead.id,
            leadName: lead.leadName,
            contactName: lead.contactName,
            source: lead.source,
            leadFee: +lead.leadFee,
            phone: lead.phone,
            email: lead.email,
            address: lead.address,
            lat: +lead.lat,
            lng: +lead.lng,
            description: lead.description,
            status: lead.status,
            assignTo: lead.assignTo,
            createdBy: +localStorage.getItem('userId'),
            updatedBy: +localStorage.getItem('userId'),
        };
    }
}
