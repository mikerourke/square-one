// @flow
/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { Record } from 'immutable';
import RaisedButton from 'material-ui/RaisedButton';

/*
 * Internal dependencies
 */
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';

const PageHeaderToolbar = ({
    lead,
    handleBackTouchTap,
    handleSaveTouchTap,
}: {
    lead: Record<*>,
    handleBackTouchTap: () => void,
    handleSaveTouchTap: () => void,
}): React.Element<*> => (
    <PageHeader
        actionButtonRight={
            (<RaisedButton
                label="Save"
                onTouchTap={handleSaveTouchTap}
            />)
        }
        titleLeft={
            (<PageHeaderTitle
                backArrowTooltip="Return to Leads"
                handleBackArrowTouchTap={handleBackTouchTap}
                headerText={lead.leadName}
                subheaderText={lead.status}
                titleIconName="account_circle"
            />)
        }
    />
);

export default PageHeaderToolbar;
