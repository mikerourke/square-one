/* @flow */

/* External dependencies */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * Dialog used to edit the contents of the specified note.
 * @param {Function} handleSaveTouchTap Action to perform when the Save button
 *      is pressed.
 * @param {Function} handleCancelTouchTap Action to perform when the Cancel
 *      button is pressed.
 * @param {Function} handleInputChange Action to perform when contents are
 *      changed.
 * @param {string} title Title to display in the dialog.
 * @param {string} contents Contents of the note.
 * @param {boolean} open Indicates if the dialog is visible.
 */
const EditNoteDialog = ({
    handleSaveTouchTap,
    handleCancelTouchTap,
    handleInputChange,
    title,
    contents,
    open,
}: {
    handleSaveTouchTap: () => void,
    handleCancelTouchTap: () => void,
    handleInputChange: (event: Event & {
        currentTarget: HTMLInputElement | HTMLTextAreaElement,
    }, newValue: string) => void,
    title: string,
    contents: string,
    open: boolean,
}): React.Element<*> => (
    <Dialog
        actions={[
            <FlatButton
                label="Save"
                onTouchTap={handleSaveTouchTap}
                primary={true}
            />,
            <FlatButton
                label="Cancel"
                name="cancel"
                onTouchTap={handleCancelTouchTap}
                secondary={true}
            />,
        ]}
        open={open}
        title={title}
    >
        <TextField
            floatingLabelText="Contents"
            fullWidth={true}
            multiLine={true}
            rowsMax={4}
            name="contents"
            onChange={handleInputChange}
            value={contents}
        />
    </Dialog>
);

export default EditNoteDialog;
