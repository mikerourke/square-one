/* @flow */

/* External dependencies */
import { List } from 'immutable';

// TODO: Fix this for Flow.  For some reason disjoint unions aren't working.
type QueryData = any;

/**
 * Filters data by a specified value and returns the applicable items.
 * @param {Array | List} data Data to apply the filter to.
 * @param {string} [searchFor=''] Words/characters to filter by.
 * @param {Array} [fieldsToInclude=[]] Fields to include in search.
 * @returns {Array | List} Items from data that meet conditions.
 */
export const getSearchResults = (
    data: QueryData,
    searchFor?: string = '',
    fieldsToInclude?: Array<string> = []): QueryData => {
    const items = data;
    // Return the original dataset if the field is search for value is falsy.
    if (!searchFor || searchFor === '') {
        return data;
    }

    return items.filter((item) => {
        const fieldsSearch = fieldsToInclude.map((fieldName) => {
            const itemValue = item.get(fieldName).toLowerCase();
            const searchValue = searchFor.toLowerCase();
            return (itemValue.includes(searchValue));
        });
        return (fieldsSearch.includes(true));
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
    order?: string = 'asc'): QueryData =>
        data.slice().sort((leftHandItem, rightHandItem) => {
            const sortValue = (leftHandItem[key] > rightHandItem[key]) ? 1 : -1;

            // Multiplying the value by -1 ensures the array is sorted
            // descending.
            if (order === 'desc') {
                return (sortValue * -1);
            }
            return sortValue;
        });
