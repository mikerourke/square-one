import React, { PropTypes } from 'react';
import styled from 'styled-components';
import muiTheme from 'scenes/theme';

const Wrapper = styled.div`
    align-items: center;
    background-color: ${muiTheme.palette.canvasColor};
    color: ${muiTheme.palette.textColor};
    display: flex;
    font-size: 24px;
    height: 56px;
    padding: 0 24px;
`;

const PaperHeader = ({
    title,
}) => (
    <Wrapper>
        {title}
    </Wrapper>
);

PaperHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PaperHeader;
