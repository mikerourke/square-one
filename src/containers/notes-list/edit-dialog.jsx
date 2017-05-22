/* @flow */

/* External dependencies */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import FormTextField from 'components/forms/form-text-field';

/**
 * Dialog used to edit the contents of the specified note.
 * @param {Function} handleSaveTouchTap Action to perform when the Save button
 *    is pressed.
 * @param {Function} handleCancelTouchTap Action to perform when the Cancel
 *    button is pressed.
 * @param {Function} handleContentsChange Action to perform when contents are
 *    changed.
 * @param {string} title Title to display in the dialog.
 * @param {string} contents Contents of the note.
 * @param {boolean} open Indicates if the dialog is visible.
 */
const EditNoteDialog = ({
  handleSaveTouchTap,
  handleCancelTouchTap,
  handleContentsChange,
  title,
  contents,
  open,
}: {
  handleSaveTouchTap: () => void,
  handleCancelTouchTap: () => void,
  handleContentsChange: (event: Event & {
    currentTarget: HTMLInputElement | HTMLTextAreaElement,
  }, newValue: string | number) => void,
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
    <FormTextField
      floatingLabelText="Contents"
      fullWidth={true}
      isRequired={true}
      multiLine={true}
      name="contents"
      onInputUpdate={handleContentsChange}
      rows={4}
      rowsMax={8}
      showErrorOnRender={false}
      value={contents}
    />
  </Dialog>
);

export default EditNoteDialog;
