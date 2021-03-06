/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import { selectChangesInLead } from 'state/entities/changes/selectors';
import { Change, Lead } from 'state/entities/models';
import Timeline from 'components/timeline';

/* Types */
type DefaultProps = {
  changes: List<Change>,
};

type Props = {
  lead: Lead,
  changes?: List<Change>,
};

const mapStateToProps = (state, ownProps) => ({
  changes: selectChangesInLead(state, ownProps),
});

/**
 * Timeline of changes associated with a Lead.
 * @param {Lead} lead Lead entity containing changes.
 * @export
 * @class ChangesTimeline
 */
export class ChangesTimeline extends Component<DefaultProps, Props, *> {
  props: Props;

  static defaultProps = {
    changes: new List(),
  };

  render(): React.Element<*> {
    const { changes } = this.props;
    return (
      <Timeline
        timelineEvents={changes}
      />
    );
  }
}

export default connect(mapStateToProps)(ChangesTimeline);
