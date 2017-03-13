/**
 * This code was taken from the material-ui-datatables library and modified
 *      slightly to use the styled-components library.  I also stripped the
 *      comments for each prop and removed some of the code that allowed for
 *      customization.  I copied and modified the code because all of the
 *      material-ui library components that the material-ui-datatables library
 *      depended on were being tacked on to my Webpack bundle, rather than
 *      being pulled from the version that my project depends on.  This was
 *      adding more than 500kb to the bundle size.
 * @see https://github.com/hyojin/material-ui-datatables
 */

/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import { TableHeaderColumn } from 'material-ui/Table';
import Tooltip from 'material-ui/internal/Tooltip';

/**
 * Styled component wrapper for the header icon.
 */
const IconWrapper = styled.div`
    display: inline-block;
    height: 16px;
    margin: 0 8px;
    vertical-align: middle;
    width: 16px;
`;

/**
 * Styled component wrapper for the title.
 */
const TitleWrapper = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

/**
 * Represents a column in the table header.
 * @export
 * @class HeaderColumn
 */
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
        sorted?: boolean,
        style?: Object,
        tooltip?: string,
    };

    static defaultProps = {
        sortable: false,
        order: 'asc',
    };

    static muiName = 'TableHeaderColumn';

    constructor(props: any, context: any): void {
        super(props, context);
        this.state = {
            sortHovered: false,
        };
    }

    onMouseEnter = (): void => {
        const { sortable, tooltip } = this.props;
        if (tooltip !== undefined) {
            this.setState({ hovered: true });
        }
        if (sortable) {
            this.setState({ sortHovered: true });
        }
    };

    onMouseLeave = (): void => {
        const { sortable, tooltip } = this.props;
        if (tooltip !== undefined) {
            this.setState({ hovered: false });
        }
        if (sortable) {
            this.setState({ sortHovered: false });
        }
    };

    getRootStyle = (): Object => {
        const { alignRight, sortable, sorted } = (this.props: Object);
        const { muiTheme: { tableHeaderColumn } } = (this.context: Object);

        return {
            color: sorted ? '#3A3A3A' : tableHeaderColumn.textColor,
            cursor: sortable ? 'pointer' : 'default',
            fontSize: 12,
            fontWeight: 'normal',
            height: tableHeaderColumn.height,
            paddingLeft: tableHeaderColumn.spacing,
            paddingRight: tableHeaderColumn.spacing,
            position: 'relative',
            textAlign: alignRight ? 'right' : 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
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
            order,
            sortable,
            sorted,
            style,
            tooltip,
            ...props
        } = this.props;

        const { prepareStyles } = this.context.muiTheme;
        const rootStyle = this.getRootStyle();

        const handlers = {
            onClick: this.onClick,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
        };

        let tooltipNode;
        if (tooltip !== undefined) {
            tooltipNode = (
                <Tooltip
                    label={tooltip}
                    show={this.state.hovered}
                    style={{
                        boxSizing: 'border-box',
                        marginTop: 8,
                    }}
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
                        style={{
                            display: sorted ? 'inline' : 'none',
                            fontSize: 18,
                            height: '100%',
                            opacity: sorted ? 0.87 : 0.54,
                            width: '100%',
                        }}
                    >
                        {sortIconName}
                    </FontIcon>
                </IconWrapper>
            );
        }

        let leftSortIcon;
        let rightSortIcon;
        if (sortable && rootStyle.textAlign === 'left') {
            rightSortIcon = sortIcon;
        } else if (sortable && rootStyle.textAlign === 'right') {
            leftSortIcon = sortIcon;
        }

        return (
            <th
                className={className}
                style={prepareStyles(Object.assign(rootStyle, style))}
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
