import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import TextField from 'material-ui/TextField';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle,
} from 'material-ui/Toolbar';
import styles from 'scenes/styles';

// TODO: Clean up unused items.  Create a table with custom filters to go in
// the icon dropdown menu.

class HeaderToolbar extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    }

    getStyles() {
        const { palette } = this.context.muiTheme.baseTheme;

        return {
            iconButton: Object.assign({}, styles.iconButton, {
                color: palette.primary2Color,
            }),
            toolbar: {
                backgroundColor: 'white',
                margin: '10px 0',
                padding: 0,
            },
            toolbarGroup: {
                margin: 0,
                paddingLeft: '24px',
            },
            toolbarText: {
                color: palette.primary2Color,
                fontSize: '24px',
            },
        };
    }

    render() {
        const localStyles = this.getStyles();
        const { title } = this.props;

        return (
            <Toolbar style={localStyles.toolbar}>
                <ToolbarGroup
                    firstChild={true}
                    style={localStyles.toolbarGroup}
                >
                    <ToolbarTitle
                        style={localStyles.toolbarText}
                        text={title}
                    />
                </ToolbarGroup>
                <ToolbarGroup>
                    <IconButton
                        iconStyle={localStyles.iconButton}
                        iconClassName="material-icons"
                    >
                        search
                    </IconButton>
                    <TextField
                        underlineShow={false}
                        hintText="Search"
                    />
                    <IconMenu
                        iconButtonElement={
                            <IconButton
                                iconStyle={localStyles.iconButton}
                                iconClassName="material-icons"
                            >
                                filter_list
                            </IconButton>
                        }
                    >
                        <MenuItem value={1} primaryText="Item" />
                        <MenuItem value={2} primaryText="Another Item" />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

HeaderToolbar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default HeaderToolbar;
