/* @flow */

/* Types */
import type { Record } from 'immutable';

/**
 * Compares the property values of a Record to the property values
 *      of another Record and returns true if the values don't match.
 * @param {Record} compareFrom Record to compare from.
 * @param {Record} compareTo Record to compare to.
 * @returns {boolean} True if the values don't match.
 */
export default (compareFrom: Record<*>, compareTo: Record<*>): boolean => {
    // Immutable Records have a "toJS()" function, for some reason Flow
    // isn't picking it up.
    // $FlowIgnore
    const fromObject = compareFrom.toJS();
    // $FlowIgnore
    const toObject = compareTo.toJS();

    let unmatchingValues = 0;

    Object.keys(fromObject).forEach((key) => {
        const valueForKey = fromObject[key];
        if (!Array.isArray(valueForKey)) {
            if (toObject[key] !== valueForKey) {
                unmatchingValues += 1;
            }
        }
    });
    return (unmatchingValues > 0);
};
