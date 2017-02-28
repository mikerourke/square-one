/* @flow */

/* Types */
import type { Map  } from 'immutable';

/**
 * Filters data by a specified value and returns the applicable items.
 * @param {Map} data Data to apply the filter to.
 * @param {string} [searchFor=''] Words/characters to filter by.
 * @param {Array} [fieldsToExclude=[]] Fields to exclude from search.
 * @returns {Map} Items from data that meet conditions.
 */
export const getSearchResults = (
    data: Map<number, any>,
    searchFor?: string = '',
    fieldsToExclude?: Array<string> = [],
): Map<number, any> => {
    const items = data;
    // Return the original dataset if the field is search for value is falsy.
    if (!searchFor || searchFor === '') {
        return data;
    }

    return items.filter((item) => {
        let countFound = 0;
        Object.keys(item).forEach((key) => {
            // If any fields were specified in the "fieldsToExclude" array,
            // don't include these in the results.
            if (!fieldsToExclude.includes(key)) {
                // To ensure a valid match is made, convert all values to
                // lowercase.
                const itemValue = item[key].toString().toLowerCase();
                if (itemValue.includes(searchFor.toLowerCase())) {
                    countFound += 1;
                }
            }
        });
        return (countFound > 0);
    }).toMap();
};

/**
 * Sorts an array of data by the specified key and order.
 * @param {Map} data Data to be sorted.
 * @param {string} key Field to sort by.
 * @param {string} [order='asc'] Order to sort by (asc or desc).
 * @returns {Map} Sorted items from data.
 */
export const getSortedData = (
    data: Map<number, any>,
    key: string,
    order?: string = 'asc',
): Map<number, any> =>
    data.slice().sort((leftHandItem, rightHandItem) => {
        const sortValue = (leftHandItem[key] > rightHandItem[key]) ? 1 : -1;

        // Multiplying the value by -1 ensures the array is sorted descending.
        if (order === 'desc') {
            return (sortValue * -1);
        }
        return sortValue;
    }).toMap();
