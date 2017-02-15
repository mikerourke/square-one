/*
 * External dependencies
 */
import React, { PropTypes } from 'react';
import styled from 'styled-components';

/**
 * Base styled component for the column.
 */
const Column = styled.div`
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
const getStyle = (columnIndex) => {
    if (columnIndex === 0) {
        return { paddingRight: 8 };
    }

    return { paddingLeft: 8 };
};

/**
 * Column on a two-column form.
 * @param children Nodes to display in the column.
 * @param columnIndex {number} Indicates if the column is left or right side.
 * @constructor
 */
const FormColumn = ({
    children,
    columnIndex,
}) => (
    <Column
        style={getStyle(columnIndex)}
    >
        {children}
    </Column>
);

FormColumn.propTypes = {
    children: PropTypes.node.isRequired,
    columnIndex: PropTypes.number.isRequired,
};

export default FormColumn;
