import styled from 'styled-components';

const Column = styled.div`
    flex: 1 400px;
    margin: 0 auto;
    min-width: 0px;
`;

const LeftColumn = styled(Column)`
    padding-right: 8px;
`;

const RightColumn = styled(Column)`
    padding-left: 8px;
`;

export {
    LeftColumn,
    RightColumn,
};
