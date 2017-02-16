/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';

/*
 * Internal dependencies
 */
import { palette } from 'style/mui';

const Container = styled.div`
    background-color: ${palette.primary1Color};
    color: ${palette.alternateTextColor};
    height: 144px;
    padding-left: 24px;
`;

const EmailWrapper = styled.div`
    font-size: 14px;
    margin-top: 12px;
`;

/**
 * Header used by the Sidebar in the application layout.
 * @param {string} userEmail Email address of the logged in user.
 * @constructor
 */
const SidebarHeader = ({
    userEmail,
}) => (
    <Container>
        <FontIcon
            className="material-icons"
            style={{
                color: palette.alternateTextColor,
                fontSize: 56,
                marginTop: 24,
            }}
        >
            face
        </FontIcon>
        <EmailWrapper>
            {userEmail}
        </EmailWrapper>
    </Container>
);

SidebarHeader.propTypes = {
    userEmail: PropTypes.string.isRequired,
};

export default SidebarHeader;
