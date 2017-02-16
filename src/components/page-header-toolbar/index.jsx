/*
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import {
    Toolbar,
    ToolbarGroup
} from 'material-ui/Toolbar';

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
class HeaderToolbar extends Component {
    /**
     * React propTypes
     * @type {Object}
     * @property {number} [height=144] Height of the toolbar in pixels.
     * @property {Node} leftElement Element to show in the left-hand Toolbar
     *      Group.
     * @property {Node} [middleElement={}] Element to show in the center Toolbar
     *      Group.
     * @property {Node} rightElement Element to show in the right-hand Toolbar
     *      Group.
     */
    static propTypes = {
        height: PropTypes.number,
        leftElement: PropTypes.object.isRequired,
        middleElement: PropTypes.object,
        rightElement: PropTypes.object.isRequired,
    };

    /**
     * @ignore
     */
    static defaultProps = {
        height: 144,
        middleElement: {},
    };

    render() {
        const {
            height,
            leftElement,
            middleElement,
            rightElement,
        } = this.props;

        return (
            <Toolbar height={height}>
                <GroupContainer>
                    <ToolbarGroup firstChild={true}>
                        {leftElement}
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {middleElement}
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {rightElement}
                    </ToolbarGroup>
                </GroupContainer>
            </Toolbar>
        )
    }
}

export default HeaderToolbar;
