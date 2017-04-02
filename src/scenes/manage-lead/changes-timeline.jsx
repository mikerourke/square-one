/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import { selectChangesInLead } from 'state/entities/changes/selectors';
import { Change, Lead } from 'state/entities/models';
import Timeline from 'components/timeline';

/* Types */
type Props = {
    lead: Lead,
    changes?: List<Change>,
};

const mapStateToProps = (state, ownProps) => ({
    changes: selectChangesInLead(state, ownProps),
});

export class ChangesTimeline extends React.Component<*, Props, *> {
    props: Props;

    render() {
        const { changes } = this.props;
        return (
            <Timeline
                timelineEvents={changes}
            />
        );
    }
}

export default connect(mapStateToProps)(ChangesTimeline);
