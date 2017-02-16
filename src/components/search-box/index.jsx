/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

/*
 * Internal dependencies
 */
import getRgbFromHex from 'lib/rgb-to-hex';

/**
 * Styled container for the search box.
 */
const Container = styled.div`
    border-radius: 4px;
    display: flex;
`;

/**
 * Sets the color and transparency of the IconButton inline.
 * @param {string} iconColor Name of the color to apply to the element.
 * @param {number} [transparency=1] Transparency value of the icon.
 * @returns {Object} Inline style for the column.
 */
const getInlineStyle = (iconColor, transparency = 1) => {
    const { r, g, b } = getRgbFromHex(iconColor);
    return {
        color: `rgba(${r},${g},${b},${transparency})`,
    };
};

/**
 * Search box for filtering table data.
 * @param {string} id Id of the container for reference.
 * @param {string} [iconColor="white"] Color of the Search icon.
 * @constructor
 */
const SearchBox = ({
    id,
    iconColor,
}) => (
    <Container id={id}>
        <IconButton
            iconClassName="material-icons"
            iconStyle={getInlineStyle(iconColor)}
        >
            search
        </IconButton>
        <TextField
            hintText="Search"
            hintStyle={getInlineStyle(iconColor, 0.5)}
            inputStyle={getInlineStyle(iconColor)}
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
