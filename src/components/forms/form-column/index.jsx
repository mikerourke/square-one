/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';

/**
 * Styled container for the column.
 */
const Container = styled.div`
    flex: 1 400px;
    margin: 0 auto;
    min-width: 0px;
`;

/**
 * Column on a two-column form.
 */
const FormColumn = ({
    children,
}: {
    children?: React.Element<*>,
}): React.Element<*> => (
    <Container style={{ padding: '0 8px' }}>
        {children}
    </Container>
);

export default FormColumn;
