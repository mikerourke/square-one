/* @flow */

/* External dependencies */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Displays a confirmation dialog to ensure the user wishes to proceed with
 *      a specified action.
 * @param {Function} handleNoTouchTap Action to perform when the No button is
 *      pressed.
 * @param {Function} handleYesTouchTap Action to perform when the Yes button
 *      is pressed.
 * @param {string} message Message contents of the dialog.
 * @param {boolean} open Indicates if the dialog is visible.
 */
const ConfirmationDialog = ({
    handleNoTouchTap,
    handleYesTouchTap,
    message,
    open,
}: {
    handleNoTouchTap: () => void,
    handleYesTouchTap: () => void,
    message: string,
    open: boolean,
}): React.Element<*> => (
    <Dialog
        actions={[
            <FlatButton
                label="Yes"
                onTouchTap={handleYesTouchTap}
                primary={true}
            />,
            <FlatButton
                label="No"
                onTouchTap={handleNoTouchTap}
                secondary={true}
            />,
        ]}
        open={open}
        contentStyle={{ maxWidth: 496 }}
        title="Confirmation"
    >
        {message}
    </Dialog>
);

export default ConfirmationDialog;
