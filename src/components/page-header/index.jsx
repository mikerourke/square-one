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
import { palette } from 'style/mui';
import PageHeaderFilterMenu from './filter-menu';
import PageHeaderSearchBox from './search-box';
import PageHeaderTitle from './title';

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
            filterSelections,
            handleFilterMenuChange,
            handleSearchBoxChange,
            height,
            ...props,
        } = this.props;

        let searchAndFilterElement = '';
        if (filterSelections.length !== 0) {
            searchAndFilterElement = (
                <ToolbarGroup style={{ marginLeft: 0 }}>
                    <PageHeaderSearchBox
                        handleChange={handleSearchBoxChange}
                    />
                    <PageHeaderFilterMenu
                        handleChange={handleFilterMenuChange}
                        selections={filterSelections}
                    />
                </ToolbarGroup>
            )
        }

        return (
            <Toolbar
                style={{
                    alignItems: 'baseline',
                    backgroundColor: palette.primary1Color,
                    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, ' +
                               'rgba(0, 0, 0, 0.117647) 0px 1px 4px',
                    height,
                }}
            >
                <GroupContainer>
                    <ToolbarGroup>
                        <PageHeaderTitle
                            {...props}
                        />
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

export default PageHeader;
