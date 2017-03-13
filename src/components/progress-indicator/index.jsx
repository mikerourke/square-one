/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    height: 150px;
    justify-content: center;
    margin-top: 128px;
    width: 100%;
`;

const ProgressWrapper = styled.div`
    align-self: flex-end;
    flex: 1 0 100%;
    text-align: center;
    width: 100%;
`;

const LoadingLabel = styled.div`
    align-self: flex-start;
    color: ${primary1Color};
    font-size: 14px;
    flex: 0 0 100%;
    margin-top: 24px;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
`;

const ProgressIndicator = (): React.Element<*> => (
    <Container>
        <ProgressWrapper>
            <CircularProgress
                thickness={8}
                size={96}
            />
        </ProgressWrapper>
        <LoadingLabel>
            Loading, please wait...
        </LoadingLabel>
    </Container>
);

export default ProgressIndicator;
