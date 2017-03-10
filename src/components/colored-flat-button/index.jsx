/* @flow */

/* External dependencies */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import getRgbFromHex from 'lib/rgb-to-hex';
import {
    accent1Color,
    alternateTextColor,
    primary1Color,
} from 'style/mui/palette';

/**
 * Returns a string representing the background color of the button based on
 *      whether the <tt>primary</tt> or <tt>secondary</tt> flags were specified.
 * @param {boolean} primary Indicates if the button corresponds with a primary
 *      action.
 * @param {boolean} secondary Indicates if the button corresponds with a
 *      secondary action.
 * @returns {string} Color to display on the button background.
 */
const getBackgroundColor = (primary: boolean, secondary: boolean): string => {
    if (primary) {
        return primary1Color;
    }

    if (secondary) {
        return accent1Color;
    }

    return 'black';
};

/**
 * Returns a string representing the hover color for the button, which is
 *      the value of <tt>getBackgroundColor</tt> with slight transparency
 *      applied.
 * @param {boolean} primary Indicates if the button corresponds with a primary
 *      action.
 * @param {boolean} secondary Indicates if the button corresponds with a
 *      secondary action.
 * @returns {string} Color (with transparency) to display on hover.
 */
const getHoverColor = (primary: boolean, secondary: boolean): string => {
    const backgroundColor = getBackgroundColor(primary, secondary);
    const { r, g, b } = getRgbFromHex(backgroundColor);
    return `rgba(${r},${g},${b},0.75)`;
};

/**
 * Flat button with a solid background color.
 * @param {Function} handleTouchTap Action to perform when the button is
 *      pressed.
 * @param {boolean} primary Indicates if the button corresponds with a primary
 *      action.
 * @param {boolean} secondary Indicates if the button corresponds with a
 *      secondary action.
 * @param {...Object} props Other props associated with the button.
 */
const ColoredFlatButton = ({
    handleTouchTap,
    primary,
    secondary,
    ...props
}: {
    handleTouchTap: () => void,
    primary?: boolean,
    secondary?: boolean,
}): React.Element<*> => (
    <FlatButton
        backgroundColor={getBackgroundColor(primary, secondary)}
        hoverColor={getHoverColor(primary, secondary)}
        labelStyle={{ color: 'white' }}
        onTouchTap={handleTouchTap}
        {...props}
    />
);

export default ColoredFlatButton;
