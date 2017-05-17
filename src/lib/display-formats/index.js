/* @flow */

/* External dependencies */
import moment from 'moment';

/**
 * Converts an unformatted date string to a date string used for displaying
 *    in components.
 * @param {string} unformattedDate Date to format.
 * @returns {string} Formatted date.
 */
export const getDisplayDate = (unformattedDate: string): string => {
  const isDateValid = moment(unformattedDate).isValid();
  let formattedDate = unformattedDate;
  if (isDateValid) {
    const oldFormat = 'YYYY-MM-DD HH:mm:ss.SS';
    const newFormat = 'ddd MMM Do, YYYY h:mm A';
    formattedDate = moment(unformattedDate, oldFormat).format(newFormat);
  }
  return formattedDate;
};

/**
 * Removes invalid characters from a template string.
 * @param {string} stringValue Value to be formatted.
 * @returns {string} String with line breaks and tabs removed.
 */
export const getDedentedString = (stringValue: string): string => {
  let size = -1;
  // Find all line feed/newline characters and whitespace characters
  // (\r \n \t \f \v) and replace with valid string characters.
  return stringValue.replace(/\n(\s+)/g, (match, p1) => {
    // The size was initialized to -1. If a tab character was found in the
    // value, reassign the value of size to the corresponding length.
    if (size < 0) {
      size = p1.replace(/\t/g, '    ').length;
    }
    return `\n${p1.slice(Math.min(p1.length, size))}`;
  });
};
