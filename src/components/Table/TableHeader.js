import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle,
} from 'material-ui/Toolbar';
import globalStyles from 'scenes/styles';

// TODO: Clean up unused items.  Create a table with custom filters to go in
// the icon dropdown menu.

const styles = Object.assign({}, globalStyles, {
    iconButton: Object.assign({}, globalStyles.iconButton, {
        color: globalStyles.palette.primary2Color,
    }),
    searchBox: {
        borderRadius: '4px',
        display: 'flex',
    },
    tableHeader: {
        backgroundColor: globalStyles.palette.canvasColor,
        padding: 0,
    },
    tableHeaderGroup: {
        margin: 0,
        paddingLeft: globalStyles.spacing.gutterStandard,
    },
    tableHeaderText: {
        color: globalStyles.palette.primary2Color,
        fontSize: globalStyles.typography.headerSize,
    },
});

class TableHeader extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    render() {
        const { title } = this.props;

        return (
            <Toolbar style={styles.tableHeader}>
                <ToolbarGroup
                    firstChild={true}
                    style={styles.tableHeaderGroup}
                >
                    <ToolbarTitle
                        style={styles.tableHeaderText}
                        text={title}
                    />
                </ToolbarGroup>
                <ToolbarGroup>
                    <div
                        id="searchBox"
                        style={styles.searchBox}
                    >
                        <IconButton
                            iconStyle={styles.iconButton}
                            iconClassName="material-icons"
                        >
                            search
                        </IconButton>
                        <TextField
                            underlineShow={false}
                            hintText="Search"
                        />
                    </div>
                    <IconMenu
                        iconButtonElement={
                            <IconButton
                                iconStyle={styles.iconButton}
                                iconClassName="material-icons"
                            >
                                filter_list
                            </IconButton>
                        }
                    >
                        <MenuItem value={1} primaryText="Item" />
                        <MenuItem value={2} primaryText="Another Item" />
                    </IconMenu>
                    <Link to="leads/new">
                        <IconButton
                            iconStyle={styles.iconButton}
                            iconClassName="material-icons"
                        >
                            add_circle_outline
                        </IconButton>
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

TableHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default TableHeader;
