/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import { selectChangesInLead } from 'state/entities/changes/selectors';
import { Change, Lead } from 'state/entities/models';
import Timeline from 'components/timeline';

const mapStateToProps = (state, ownProps) => ({
    changes: selectChangesInLead(ownProps),
});

/**
 * Timeline component showing changes to the Lead.
 * @param {Lead} lead Parent lead associated with changes.
 */
const ChangesTimeline = ({
    lead,
}: {
    lead: Lead,
}): React.Element<*> => (
    <Timeline
        timelineEvents={this.props.changes}
    />
);

export default connect(mapStateToProps)(ChangesTimeline);
