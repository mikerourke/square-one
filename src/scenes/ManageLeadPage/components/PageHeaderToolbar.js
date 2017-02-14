import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RaisedButton from 'material-ui/RaisedButton';
import HeaderToolbar from 'components/HeaderToolbar';
import ToolbarTitle from './ToolbarTitle';

const PageHeaderToolbar = ({
    lead,
    handleBackTouchTap,
    handleSaveTouchTap,
}) => (
    <HeaderToolbar
        hasSearch={false}
        height={96}
        title={
            (<ToolbarTitle
                lead={lead}
                handleBackTouchTap={handleBackTouchTap}
            />)
        }
    >
        <RaisedButton
            name="save-button"
            label="Save"
            onTouchTap={handleSaveTouchTap}
            style={{ margin: 0 }}
        />
    </HeaderToolbar>
);

PageHeaderToolbar.propTypes = {
    lead: ImmutablePropTypes.record.isRequired,
    handleBackTouchTap: PropTypes.func.isRequired,
    handleSaveTouchTap: PropTypes.func.isRequired,
};

export default PageHeaderToolbar;
