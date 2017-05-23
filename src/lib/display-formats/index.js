/* @flow */

/* External dependencies */
import moment from 'moment';
import phones from 'phones';

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
 * Parses the specified phone number and returns a formatted string used for
 *    displaying the number in components.
 * @param {string} unformattedPhone Unformatted phone number.
 * @returns {string} Formatted phone number.
 */
export const getDisplayPhone = (unformattedPhone: string): string => {
  if (phones.validate(unformattedPhone)) {
    const parsedPhone = phones.parse(unformattedPhone);
    const areaCode = parsedPhone.substring(0, 3);
    const firstThree = parsedPhone.substring(3, 9);
    const lastFour = parsedPhone.substring(9);

    return `(${areaCode}) ${firstThree}-${lastFour}`;
  }
  return unformattedPhone;
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

/**
 * Returns the specified string value in proper case (e.g. title is converted
 *    to Title).
 * @param {string} stringValue Value to convert to proper case.
 * @returns {string} Proper cased value.
 */
export const getProperCase = (stringValue: string): string => {
  if (stringValue === '' || stringValue.length <= 1) {
    return stringValue;
  }

  return stringValue.replace(/\w\S*/g, (text) => {
    const firstLetter = text.charAt(0).toUpperCase();
    const restOfWord = text.substr(1).toLowerCase();
    return `${firstLetter}${restOfWord}`;
  });
};
