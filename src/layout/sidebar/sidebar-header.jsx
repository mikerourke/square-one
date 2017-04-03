/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';

/* Internal dependencies */
import { alternateTextColor, primary1Color } from 'style/mui/palette';

/**
 * Styled container for the header contents.
 */
const Container = styled.div`
    background-color: ${primary1Color};
    color: ${alternateTextColor};
    height: 144px;
    padding-left: 24px;
`;

/**
 * Styled wrapper for the full name header.
 */
const FullNameWrapper = styled.div`
    font-size: 14px;
    margin-top: 12px;
`;

/**
 * Header used by the Sidebar in the application layout.
 * @param {string} fullNameOfUser Name to display in the header.
 */
const SidebarHeader = ({
    fullNameOfUser,
}: {
    fullNameOfUser: string,
}): React.Element<*> => (
    <Container>
        <FontIcon
            className="material-icons"
            style={{
                color: alternateTextColor,
                fontSize: 56,
                marginTop: 24,
            }}
        >
            face
        </FontIcon>
        <FullNameWrapper>
            {fullNameOfUser}
        </FullNameWrapper>
    </Container>
);

export default SidebarHeader;
