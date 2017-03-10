/* @flow */

/* External dependencies */
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

/**
 * Statically positioned floating action button that performs the specified
 *      action.
 * @param {Function} handleTouchTap Action to perform when the button is
 *      pressed.
 * @param {string} iconName Name of the Material Icon to show.
 * @param {Object} style Custom style for the button.
 * @param {...Object} props Other props associated with the button element.
 */
const ActionButton = ({
    handleTouchTap,
    iconName,
    style,
    ...props
}: {
    handleTouchTap: (event: Event) => void,
    iconName: string,
    style?: ?Object,
}) => (
    <FloatingActionButton
        onTouchTap={handleTouchTap}
        secondary={true}
        style={Object.assign({}, {
            bottom: 24,
            position: 'fixed',
            right: 24,
            zIndex: 999,
        }, style)}
        {...props}
    >
        <FontIcon
            className="material-icons"
            style={{ fontSize: 32 }}
        >
            {iconName}
        </FontIcon>
    </FloatingActionButton>
);

export default ActionButton;
