/* @flow */

/* External dependencies */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import FormTextField from 'components/forms/form-text-field';

/* Types */
import type { Bug } from 'lib/types';

const ReportBugDialog = ({
  bug,
  open,
  handleSubmitTouchTap,
  handleCancelTouchTap,
  handleInputChange,
}: {
  bug: Bug,
  open: boolean,
  handleSubmitTouchTap: () => void,
  handleCancelTouchTap: () => void,
  handleInputChange: (event: Event & {
    currentTarget: HTMLInputElement | HTMLTextAreaElement },
    newValue: string | number) => void,
}) => (
  <Dialog
    actions={[
      <FlatButton
        label="Submit"
        name="submit"
        primary={true}
        onTouchTap={handleSubmitTouchTap}
      />,
      <FlatButton
        label="Cancel"
        name="cancel"
        secondary={true}
        onTouchTap={handleCancelTouchTap}
      />,
    ]}
    autoScrollBodyContent={true}
    bodyStyle={{
      minHeight: 300,
      padding: '0 24px',
    }}
    contentStyle={{
      minWidth: 300,
      width: '75%',
    }}
    modal={true}
    open={open}
    title="Report a Bug"
  >
    <FormTextField
      floatingLabelText="Description"
      fullWidth={true}
      multiLine={true}
      isRequired={true}
      name="description"
      onInputUpdate={handleInputChange}
      value={bug.description}
    />
  </Dialog>
);

export default ReportBugDialog;
