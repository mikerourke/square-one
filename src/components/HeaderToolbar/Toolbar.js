import styled from 'styled-components';
import { Toolbar } from 'material-ui/Toolbar';
import { palette } from 'style/mui';

export default styled(Toolbar)`
    align-items: baseline !important;
    background-color: ${palette.primary1Color} !important;
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, 
                rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    height: ${props => props.height}px !important;
`;
