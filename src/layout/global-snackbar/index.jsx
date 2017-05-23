/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

/* Internal dependencies */
import { toggleGlobalSnackbar } from 'state/gui/actions';
import { selectGuiGlobalSnackbar } from 'state/gui/selectors';
import { getColorByNoticeType } from 'style/mui';

/* Types */
import type { Map } from 'immutable';
import type { NoticeType } from 'lib/types';

const mapStateToProps = state => ({
  globalSnackbar: selectGuiGlobalSnackbar(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  toggleSnackbar: (message, noticeType) =>
    dispatch(toggleGlobalSnackbar(message, noticeType)),
});

/**
 * Returns an object with the style to apply to the specified target element
 *    based on the notice type.
 * @param {NoticeType} noticeType Notice type associated with the prompt.
 * @returns {Object}
 */
const getStyleByNoticeType = (noticeType: NoticeType) => ({
  backgroundColor: getColorByNoticeType(noticeType),
});

/**
 * Snackbar that notifies the user of any errors or successful transactions by
 *    dispatching the toggleGlobalSnackbar action.
 * @param {Map} globalSnackbar Snackbar properties from Redux state.
 * @param {Function} toggleSnackbar Dispatches the toggleSnackbar action which
 *    shows the snackbar.
 * @constructor
 */
const GlobalSnackbar = ({
  globalSnackbar,
  toggleSnackbar,
}: {
  globalSnackbar: Map<string, any>,
  toggleSnackbar: (message: string, noticeType: NoticeType) => void,
}): React.Element<*> => (
  <Snackbar
    autoHideDuration={4000}
    bodyStyle={getStyleByNoticeType(globalSnackbar.get('noticeType'))}
    contentStyle={getStyleByNoticeType(globalSnackbar.get('noticeType'))}
    open={globalSnackbar.get('open')}
    message={globalSnackbar.get('message')}
    onRequestClose={() => toggleSnackbar('', '')}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSnackbar);
