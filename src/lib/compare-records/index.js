/* @flow */

/* Types */
import type { Record } from 'immutable';
import type { RecordDiff } from 'lib/types';

/**
 * Compares the property values of a Record to the property values
 *      of another Record and returns true if the values don't match.
 * @param {Record} compareFrom Record to compare from.
 * @param {Record} compareTo Record to compare to.
 * @returns {Array} Array of items that don't match.
 */
const compareRecords = (
    compareFrom: Record<*>,
    compareTo: Record<*>,
): Array<RecordDiff> => {
    // Immutable Records have a "toJS()" function, for some reason Flow
    // isn't picking it up.
    // $FlowIgnore
    const fromObject = compareFrom.toJS();
    // $FlowIgnore
    const toObject = compareTo.toJS();

    const unmatchingFields = [];

    Object.keys(fromObject).forEach((key) => {
        const fromValue = fromObject[key];
        if (!Array.isArray(fromValue) && typeof fromValue !== 'object') {
            const toValue = toObject[key];
            if (toValue !== fromValue) {
                unmatchingFields.push({
                    key,
                    fromValue,
                    toValue,
                });
            }
        }
    });
    return unmatchingFields;
};

export default compareRecords;
