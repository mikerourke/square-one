/*
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import {
    Toolbar,
    ToolbarGroup
} from 'material-ui/Toolbar';

/*
 * Internal dependencies
 */
import PageHeaderToolbarSearchBox from './search-box';
import PageHeaderToolbarFilterMenu from './filter-menu';

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
class PageHeaderToolbar extends Component {
    /**
     * @type {Object}
     * @property {Node} [elementButtonsRight=''] Button elements on the right
     *      side of the toolbar.
     * @property {Node} elementTitleLeft Title element on the left side of the
     *      toolbar.
     * @property {Array} [filterSelections=[]] Filter options to display (if
     *      applicable).
     * @property {Function} [handleFilterMenuChange=() => {}] Function to
     *      perform when an option is selected from the Filter Menu.
     * @property {Function} [handleSearchBoxChange=() => {}] Function to
     *      perform when text is entered into the Search Box.
     * @property {number} [height=144] Height of the toolbar in pixels.
     */
    static propTypes = {
        elementButtonsRight: PropTypes.node,
        elementTitleLeft: PropTypes.node.isRequired,
        filterSelections: PropTypes.arrayOf(PropTypes.object),
        handleFilterMenuChange: PropTypes.func,
        handleSearchBoxChange: PropTypes.func,
        height: PropTypes.number,
    };

    /**
     * @ignore
     */
    static defaultProps = {
        elementButtonsRight: '',
        filterSelections: [],
        handleFilterMenuChange: () => {},
        handleSearchBoxChange: () => {},
        height: 144,
    };

    render() {
        const {
            elementButtonsRight,
            elementTitleLeft,
            filterSelections,
            handleFilterMenuChange,
            handleSearchBoxChange,
            height,
        } = this.props;

        let searchAndFilterElement = '';
        if (filterSelections.length !== 0) {
            searchAndFilterElement = (
                <ToolbarGroup>
                    <PageHeaderToolbarSearchBox
                        handleChange={handleSearchBoxChange}
                    />
                    <PageHeaderToolbarFilterMenu
                        handleChange={handleFilterMenuChange}
                        selections={filterSelections}
                    />
                </ToolbarGroup>
            )
        }

        return (
            <Toolbar height={height}>
                <GroupContainer>
                    <ToolbarGroup firstChild={true}>
                        {elementTitleLeft}
                    </ToolbarGroup>
                    {searchAndFilterElement}
                    <ToolbarGroup>
                        {elementButtonsRight}
                    </ToolbarGroup>
                </GroupContainer>
            </Toolbar>
        )
    }
}

export default PageHeaderToolbar;
