/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';

/*
 * Internal dependencies
 */
import { palette } from 'style/theme';

const Container = styled.div`
    background-color: ${palette.primary1Color};
    color: ${palette.alternateTextColor};
    height: 144px;
    padding-left: 24px;
`;

const Detail = styled.div`
    font-size: 14px;
    margin-top: 12px;
`;

const getStyle = () => ({
    color: palette.alternateTextColor,
    fontSize: 56,
    marginTop: 24,
});

const Header = ({
    userEmail,
}) => (
    <Container>
        <FontIcon
            className="material-icons"
            style={getStyle()}
        >
            face
        </FontIcon>
        <Detail>
            {userEmail}
        </Detail>
    </Container>
);

Header.propTypes = {
    userEmail: PropTypes.string.isRequired,
};

export default Header;
