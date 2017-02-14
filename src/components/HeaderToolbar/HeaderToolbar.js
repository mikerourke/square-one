import React, { PropTypes, Component } from 'react';
import { palette } from 'scenes/theme';
import FilterMenu from './FilterMenu';
import SearchBox from './SearchBox';
import Toolbar from './Toolbar';
import ToolbarGroup from './ToolbarGroup';
import ToolbarGroupContainer from './ToolbarGroupContainer';

const filterSelections = [
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
];

class HeaderToolbar extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        hasSearch: PropTypes.bool,
        height: PropTypes.number,
        title: PropTypes.object.isRequired,
    };

    static defaultProps = {
        hasSearch: false,
        height: 144,
    };

    render() {
        const { children, hasSearch, height, title } = this.props;

        let centerGroup = (
            <ToolbarGroup>
                <SearchBox
                    id="search-box"
                    iconColor={palette.alternateTextColor}
                />
                <FilterMenu
                    iconColor={palette.alternateTextColor}
                    selections={filterSelections}
                />
            </ToolbarGroup>
        );
        if (!hasSearch) {
            centerGroup = (
                <ToolbarGroup />
            );
        }

        return (
            <Toolbar height={height}>
                <ToolbarGroupContainer>
                    <ToolbarGroup firstChild={true}>
                        {title}
                    </ToolbarGroup>
                    {centerGroup}
                    <ToolbarGroup>
                        {children}
                    </ToolbarGroup>
                </ToolbarGroupContainer>
            </Toolbar>
        );
    }
}

export default HeaderToolbar;
