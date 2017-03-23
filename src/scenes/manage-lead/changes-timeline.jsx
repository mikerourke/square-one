/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

/* Internal dependencies */
import { selectChangesInLead } from 'state/entities/changes/selectors';
import Change from 'state/entities/changes/model';
import Timeline from 'components/timeline';

const mapStateToProps = (state, ownProps) => ({
    changes: selectChangesInLead(ownProps),
});

export class ChangesTimeline extends React.Component {
    props: {
        leadId: number,
        changes?: List<Change>,
    };

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
