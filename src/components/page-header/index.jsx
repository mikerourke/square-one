/*
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import {
    Toolbar,
    ToolbarGroup,
} from 'material-ui/Toolbar';

/*
 * Internal dependencies
 */
import { palette } from 'style/mui';

const GroupContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 24px;
    width: 100%;
`;

/**
 * Toolbar on the page header.
 */
class PageHeader extends Component {
    /**
     * @type {Object}
     * @property {Node} [elementButtonsRight=''] Button elements on the right
     *      side of the toolbar.
     * @property {Node} elementTitleLeft Title element on the left
     *      side of the toolbar.
     * @property {number} [height=144] Height of the toolbar in pixels.
     */
    static propTypes = {
        elementButtonsRight: PropTypes.node,
        elementTitleLeft: PropTypes.node.isRequired,
        height: PropTypes.number,
    };

    /**
     * @ignore
     */
    static defaultProps = {
        elementButtonsRight: '',
        height: 144,
    };

    render() {
        const {
            elementButtonsRight,
            elementTitleLeft,
            height,
        } = this.props;

        return (
            <Toolbar
                style={{
                    alignItems: 'flex-start',
                    backgroundColor: palette.primary1Color,
                    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, ' +
                               'rgba(0, 0, 0, 0.117647) 0px 1px 4px',
                    height,
                    paddingTop: 24,
                }}
            >
                <ToolbarGroup>
                    {elementTitleLeft}
                </ToolbarGroup>
                <ToolbarGroup>
                    {elementButtonsRight}
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default PageHeader;
