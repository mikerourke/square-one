/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

/*
 * Internal dependencies
 */
import { palette } from 'style/mui';
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
 * @param {number} [transparency=1] Transparency value of the icon.
 * @returns {Object} Inline style for the column.
 */
const getInlineStyle = (transparency = 1) => {
    const { r, g, b } = getRgbFromHex(palette.alternateTextColor);
    return {
        color: `rgba(${r},${g},${b},${transparency})`,
    };
};

/**
 * Search box for filtering table data.
 * @constructor
 */
const PageHeaderSearchBox = ({
    handleChange,
}) => (
    <Container id="search-box">
        <IconButton
            iconClassName="material-icons"
            iconStyle={getInlineStyle()}
        >
            search
        </IconButton>
        <TextField
            hintText="Search"
            hintStyle={getInlineStyle(0.5)}
            inputStyle={getInlineStyle()}
            onChange={handleChange}
        />
    </Container>
);

PageHeaderSearchBox.propTypes = {
    handleChange: PropTypes.func.isRequired,
};

export default PageHeaderSearchBox;
