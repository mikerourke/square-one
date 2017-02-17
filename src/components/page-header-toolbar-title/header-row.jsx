/*
 * External dependencies
 */
import styled from 'styled-components';
import { palette } from 'style/mui';

/**
 * Styled row for the page header titlebar element.
 * @type {StyledComponent}
 */
export default styled.div`
    clear: both;
    color: ${palette.alternateTextColor};
    display: inline-block;
    float: left;
    font-weight: 300;
    font-size: ${(props) => props.fontSize}px;
    padding: 4px 0;
    width: 200px;
`;
