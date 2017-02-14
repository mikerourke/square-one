import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { palette } from 'style/theme';

const Container = styled.div`
    display: flex;
`;

const PersonIcon = styled(FontIcon)`
    color: ${palette.alternateTextColor} !important;
    font-size: 56px !important;
    margin-right: 8px;
`;

const HeaderWrapper = styled.div`
    columns: auto 1;
`;

const HeaderRow = styled.div`
    clear: both;
    color: ${palette.alternateTextColor};
    display: inline-block;
    float: left;
    font-weight: 300;
    padding: 4px 0;
    width: 200px;
`;

const HeaderText = styled(HeaderRow)`
    font-size: 18px;
`;

const SubheaderText = styled(HeaderRow)`
    font-size: 14px;
`;

const ToolbarTitle = ({
    lead,
    handleBackTouchTap,
}) => (
    <Container>
        <IconButton
            tooltip="Return to Leads list"
            tooltipPosition="top-right"
            touch={true}
            iconClassName="material-icons"
            iconStyle={{ color: palette.alternateTextColor }}
            onTouchTap={handleBackTouchTap}
        >
            arrow_back
        </IconButton>
        <PersonIcon
            className="material-icons"
        >
            person_outline
        </PersonIcon>
        <HeaderWrapper>
            <HeaderText>{lead.leadName}</HeaderText>
            <SubheaderText>{lead.status}</SubheaderText>
        </HeaderWrapper>
    </Container>
);

ToolbarTitle.propTypes = {
    lead: ImmutablePropTypes.record.isRequired,
    handleBackTouchTap: PropTypes.func.isRequired,
};

export default ToolbarTitle;
