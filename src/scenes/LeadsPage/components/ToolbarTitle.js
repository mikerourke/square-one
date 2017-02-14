import React, { PropTypes } from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import { palette } from 'scenes/theme';

const Container = styled.div`
    display: flex;
`;

const HeaderIcon = styled(FontIcon)`
    color: ${palette.alternateTextColor} !important;
    margin-right: 8px;
`;

const HeaderText = styled.div`
    color: ${palette.alternateTextColor};
    font-size: 24px;
    font-weight: 300;
    text-rendering: optimizeLegibility;
`;

const ToolbarTitle = () => (
    <Container>
        <HeaderIcon
            className="material-icons"
        >
            recent_actors
        </HeaderIcon>
        <HeaderText>Leads</HeaderText>
    </Container>
);

export default ToolbarTitle;
