/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
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
}) => (
    <PageHeader
        elementButtonsRight={
            (<RaisedButton
                name="save-button"
                label="Save"
                onTouchTap={handleSaveTouchTap}
                style={{ margin: 0 }}
            />)
        }
        elementTitleLeft={
            (<PageHeaderTitle
                backArrowTooltip="Return to Leads"
                handleBackArrowTouchTap={handleBackTouchTap}
                headerText={lead.leadName}
                subheaderText={lead.status}
                titleIconName="account_circle"
            />)
        }
        height={96}
    />
);

PageHeaderToolbar.propTypes = {
    lead: ImmutablePropTypes.record.isRequired,
    handleBackTouchTap: PropTypes.func.isRequired,
    handleSaveTouchTap: PropTypes.func.isRequired,
};

export default PageHeaderToolbar;
