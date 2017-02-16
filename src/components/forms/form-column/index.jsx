/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import styled from 'styled-components';

/**
 * Styled container for the column.
 * @type {StyledComponent}
 */
const Container = styled.div`
    flex: 1 400px;
    margin: 0 auto;
    min-width: 0px;
`;

/**
 * Adds the inline style based on the column index.  A left column (with
 *      index of 0) has right padding.  A right column (with index of 1) has
 *      left padding.
 * @param columnIndex {number} Index of the column (0 for left, 1 for right).
 * @returns {Object} Inline style for the column.
 */
const getInlineStyle = (columnIndex) => {
    if (columnIndex === 0) {
        return { paddingRight: 8 };
    }

    return { paddingLeft: 8 };
};

/**
 * Column on a two-column form.
 * @param {number} columnIndex Indicates if the column is left or right side.
 * @param {Node} children Nodes to display in the column.
 * @constructor
 */
const FormColumn = ({
    columnIndex,
    children,
}) => (
    <Container
        style={getInlineStyle(columnIndex)}
    >
        {children}
    </Container>
);

FormColumn.propTypes = {
    columnIndex: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

export default FormColumn;
