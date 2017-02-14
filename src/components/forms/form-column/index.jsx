// External dependencies
import React, { PropTypes } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1 400px;
    margin: 0 auto;
    min-width: 0px;
`;

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
 * @param props {object} Remaining props for the element.
 * @constructor
 */
const FormColumn = ({
    children,
    columnIndex,
}) => (
    <Container
        style={getStyle(columnIndex)}
    >
        {children}
    </Container>
);

FormColumn.propTypes = {
    children: PropTypes.node.isRequired,
    columnIndex: PropTypes.number.isRequired,
};

export default FormColumn;
