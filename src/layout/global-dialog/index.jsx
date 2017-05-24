/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/* Internal dependencies */
import { toggleGlobalDialog } from 'state/gui/actions';
import { selectGuiGlobalDialog } from 'state/gui/selectors';
import { getColorByNoticeType } from 'style/mui';

/* Types */
import type { Map } from 'immutable';
import type { NoticeType } from 'lib/types';

const mapStateToProps = state => ({
  globalDialog: selectGuiGlobalDialog(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  toggleDialog: (title, message, noticeType) =>
    dispatch(toggleGlobalDialog(title, message, noticeType)),
});

/**
 * Returns an object with the style to apply to the "title" element of the
 *    dialog based on the notice type.
 * @param {NoticeType} noticeType Notice type associated with the prompt.
 * @returns {Object}
 */
const getStyleByNoticeType = (noticeType: NoticeType) => ({
  color: getColorByNoticeType(noticeType),
});

/**
 * Dialog that warns or informs the user that can be called by dispatching the
 *    toggleGlobalDialog action.
 * @param {Map} globalDialog Dialog properties from Redux state.
 * @param {Function} toggleDialog Dispatches the toggleDialog action which
 *    shows the prompt.
 * @constructor
 */
const GlobalDialog = ({
  globalDialog,
  toggleDialog,
}: {
  globalDialog: Map<string, any>,
  toggleDialog: (title: string, message: string,
    noticeType: NoticeType) => void,
}): React.Element<*> => (
  <Dialog
    actions={[
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={() => toggleDialog('', '', 'none')}
      />,
    ]}
    title={globalDialog.get('title')}
    modal={true}
    open={globalDialog.get('open')}
    contentStyle={{
      maxWidth: 400,
      width: '50%',
    }}
    style={{ zIndex: 1550 }}
    titleStyle={getStyleByNoticeType(globalDialog.get('noticeType'))}
  >
    {globalDialog.get('message')}
  </Dialog>
);

export default connect(mapStateToProps, mapDispatchToProps)(GlobalDialog);

