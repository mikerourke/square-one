import React, { PropTypes } from 'react';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { getRgbFromHex } from 'style/theme';

// TODO: Add search functionality.

const Container = styled.div`
    border-radius: 4px;
    display: flex;
`;

const getStyle = (iconColor, transparency = 1) => {
    const { r, g, b } = getRgbFromHex(iconColor);
    return {
        color: `rgba(${r},${g},${b},${transparency})`,
    };
};

const SearchBox = ({
    id,
    iconColor,
}) => (
    <Container id={id}>
        <IconButton
            iconClassName="material-icons"
            iconStyle={getStyle(iconColor)}
        >
            search
        </IconButton>
        <TextField
            hintText="Search"
            hintStyle={getStyle(iconColor, 0.5)}
            inputStyle={getStyle(iconColor)}
        />
    </Container>
);

SearchBox.propTypes = {
    id: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
};

SearchBox.defaultProps = {
    iconColor: 'white',
};

export default SearchBox;
