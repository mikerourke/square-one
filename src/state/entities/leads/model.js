/* @flow */

/* External dependencies */
import { List, Record } from 'immutable';

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
    createdAt: (null: ?Date),
    updatedAt: (null: ?Date),
    typeName: ('lead': string),
}) {
    /**
     * Compares the property values of this instance to the property values
     *      of the specified Lead and returns true if the values don't match.
     * @param {Lead} lead Lead to compare values with.
     * @returns {boolean} True if the values don't match.
     */
    wasModifiedFrom(lead: Lead): boolean {
        const thisLead = this.toJS();
        const leadToCompare = lead.toJS();
        let unmatchingValues = 0;
        Object.keys(thisLead).forEach((key) => {
            const valueForKey = thisLead[key];
            if (!Array.isArray(valueForKey)) {
                if (leadToCompare[key] !== valueForKey) {
                    unmatchingValues += 1;
                }
            }
        });
        return (unmatchingValues > 0);
    }
}
