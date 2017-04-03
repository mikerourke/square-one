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
    padding: 0 8px 0 8px;
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
    <Container>
        {children}
    </Container>
);

export default FormColumn;
