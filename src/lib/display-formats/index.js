/* @flow */

/* External dependencies */
import moment from 'moment';

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

export const getDedentedString = (stringValue: string): string => {
    let size = -1;
    return stringValue.replace(/\n(\s+)/g, (m, m1) => {
        if (size < 0) {
            size = m1.replace(/\t/g, '    ').length;
        }
        return `\n${m1.slice(Math.min(m1.length, size))}`;
    });
};
