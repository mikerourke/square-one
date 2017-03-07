/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import { TableHeaderColumn } from 'material-ui/Table';
import Tooltip from 'material-ui/internal/Tooltip';

const IconWrapper = styled.div`
    display: inline-block;
    height: 16px;
    margin: 0 8px;
    vertical-align: middle;
    width: 16px;
`;

const TitleWrapper = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

export default class HeaderColumn extends TableHeaderColumn {
    props: {
        children?: React.Element<*>,
        className?: string,
        columnNumber?: number,
        hoverable?: boolean,
        onClick?: () => void,
        onHover?: () => void,
        onHoverExit?: () => void,
        order?: string,
        sortable?: boolean,
        style?: Object,
        tooltip?: string,
    };

    static muiName = 'TableHeaderColumn';

    static defaultProps = {
        sortable: false,
        order: 'asc',
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            sortHovered: false,
        };
    }

    onMouseEnter = () => {
        const { sortable, tooltip } = this.props;
        if (tooltip !== undefined) {
            this.setState({ hovered: true });
        }
        if (sortable) {
            this.setState({ sortHovered: true });
        }
    };

    onMouseLeave = () => {
        const { sortable, tooltip } = this.props;
        if (tooltip !== undefined) {
            this.setState({ hovered: false });
        }
        if (sortable) {
            this.setState({ sortHovered: false });
        }
    };

    getStyles = () => {
        const { context, props, state } = this;
        const { tableHeaderColumn } = context.muiTheme;

        return {
            root: {
                color: props.sorted ? '#3A3A3A' : tableHeaderColumn.textColor,
                cursor: props.sortable ? 'pointer' : 'default',
                fontSize: 12,
                fontWeight: 'normal',
                height: tableHeaderColumn.height,
                paddingLeft: tableHeaderColumn.spacing,
                paddingRight: tableHeaderColumn.spacing,
                position: 'relative',
                textAlign: props.alignRight ? 'right' : 'left',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
            sortIcon: {
                display: state.sortHovered || props.sorted ? 'inline' : 'none',
                height: '100%',
                opacity: props.sorted ? 0.87 : 0.54,
                width: '100%',
            },
            tooltip: {
                boxSizing: 'border-box',
                marginTop: tableHeaderColumn.height / 2,
            },
        };
    };

    render() {
        const {
            children,
            className,
            columnNumber,
            hoverable,
            onClick,
            onHover,
            onHoverExit,
            style,
            tooltip,
            sortable,
            sorted,
            order,
            ...props
        } = this.props;

        const { prepareStyles } = this.context.muiTheme;
        const styles = this.getStyles();

        const handlers = {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onClick: this.onClick,
        };

        let tooltipNode;
        if (tooltip !== undefined) {
            tooltipNode = (
                <Tooltip
                    label={tooltip}
                    show={this.state.hovered}
                    style={styles.tooltip}
                />
            );
        }

        let sortIconName = '';
        if (sorted && order === 'asc') {
            sortIconName = 'arrow_upward';
        } else if (sorted && order === 'desc') {
            sortIconName = 'arrow_downward';
        } else if (sortable) {
            sortIconName = 'arrow_upward';
        }

        let sortIcon;
        if (sortIconName !== '') {
            sortIcon = (
                <IconWrapper>
                    <FontIcon
                        className="material-icons"
                        style={styles.sortIcon}
                    >
                        {sortIconName}
                    </FontIcon>
                </IconWrapper>
            );
        }

        let leftSortIcon;
        let rightSortIcon;

        if (sortable && styles.root.textAlign === 'left') {
            rightSortIcon = sortIcon;
        } else if (sortable && styles.root.textAlign === 'right') {
            leftSortIcon = sortIcon;
        }

        return (
            <th
                className={className}
                style={prepareStyles(Object.assign(styles.root, style))}
                {...handlers}
                {...props}
            >
                {tooltipNode}
                {leftSortIcon}
                <TitleWrapper>
                    {children}
                </TitleWrapper>
                {rightSortIcon}
            </th>
        );
    }
}
