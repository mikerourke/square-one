/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import { togglePromptDialog } from 'state/gui/actions';
import { muiColors } from 'style/mui';

/* Types */
import type { Map } from 'immutable';

const mapStateToProps = state => ({
  promptDialog: state.getIn(['gui', 'promptDialog']),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  togglePrompt: (title, message, actionType) =>
    dispatch(togglePromptDialog(title, message, actionType)),
});

/**
 * Returns an object with the style to apply to the "title" element of the
 *    dialog based on the action type.
 * @param {string} actionType Action type associated with the prompt.
 * @returns {Object}
 */
const getTitleStyleByActionType = (actionType: string) => {
  if (actionType === 'error') {
    return {
      color: muiColors.redA700,
    };
  }
  return {};
};

/**
 * Dialog that warns or informs the user that can be called by dispatching the
 *    togglePromptDialog action.
 * @param {Map} promptDialog Dialog properties from Redux state.
 * @param {Function} togglePrompt Dispatches the togglePrompt action which
 *    shows the prompt.
 * @constructor
 */
const PromptDialog = ({
  promptDialog,
  togglePrompt,
}: {
  promptDialog: Map<string, any>,
  togglePrompt: (title: string, message: string, actionType: string) => void,
}): React.Element<*> => (
  <Dialog
    actions={[
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={() => togglePrompt('', '', '')}
      />,
    ]}
    title={promptDialog.get('title')}
    modal={true}
    open={promptDialog.get('open')}
    contentStyle={{
      maxWidth: 400,
      width: '50%',
    }}
    style={{ zIndex: 1550 }}
    titleStyle={getTitleStyleByActionType(promptDialog.get('actionType'))}
  >
    {promptDialog.get('message')}
  </Dialog>
);

export default connect(mapStateToProps, mapDispatchToProps)(PromptDialog);

