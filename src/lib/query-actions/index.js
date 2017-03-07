/* @flow */

/* External dependencies */
import { List } from 'immutable';

// TODO: Fix this for Flow.  For some reason disjoint unions aren't working.
type QueryData = Array<any> | List<*>;

/**
 * Filters data by a specified value and returns the applicable items.
 * @param {Array | List} data Data to apply the filter to.
 * @param {string} [searchFor=''] Words/characters to filter by.
 * @param {Array} [fieldsToExclude=[]] Fields to exclude from search.
 * @returns {Array | List} Items from data that meet conditions.
 */
export const getSearchResults = (
    data: QueryData,
    searchFor?: string = '',
    fieldsToExclude?: Array<string> = [],
): QueryData => {
    const items = data;
    // Return the original dataset if the field is search for value is falsy.
    if (!searchFor || searchFor === '') {
        return data;
    }

    return items.filter((item) => {
        let countFound = 0;
        Object.entries(item).forEach(([key, value]: [string, any]) => {
            // If any fields were specified in the "fieldsToExclude" array,
            // don't include these in the results.
            if (!fieldsToExclude.includes(key)) {
                // To ensure a valid match is made, convert all values to
                // lowercase.
                const itemValue = value.toString().toLowerCase();
                if (itemValue.includes(searchFor.toLowerCase())) {
                    countFound += 1;
                }
            }
        });
        return (countFound > 0);
    });
};

/**
 * Sorts an array of data by the specified key and order.
 * @param {Array | List} data Data to be sorted.
 * @param {string} key Field to sort by.
 * @param {string} [order='asc'] Order to sort by (asc or desc).
 * @returns {Array | List} Sorted items from data.
 */
export const getSortedData = (
    data: QueryData | List<*>,
    key: string,
    order?: string = 'asc',
): QueryData =>
    data.slice().sort((leftHandItem, rightHandItem) => {
        const sortValue = (leftHandItem[key] > rightHandItem[key]) ? 1 : -1;

        // Multiplying the value by -1 ensures the array is sorted descending.
        if (order === 'desc') {
            return (sortValue * -1);
        }
        return sortValue;
    });
