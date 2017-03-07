/* @flow */

/* External dependencies */
import React, { PropTypes } from 'react';
import { TableRowColumn } from 'material-ui/Table';

export default class RowColumn extends TableRowColumn {
    props: {
        children?: React.Element<*>,
        className?: string,
        columnNumber?: number,
        hoverable?: boolean,
        onClick?: () => void,
        onHover?: () => void,
        onHoverExit?: () => void,
        style?: Object,
    };

    static muiName = 'TableRowColumn';

    getStyles = () => {
        const { context, props } = this;
        const { tableRowColumn } = context.muiTheme;

        const styles = {
            root: {
                paddingLeft: tableRowColumn.spacing,
                paddingRight: tableRowColumn.spacing,
                height: tableRowColumn.height,
                textAlign: 'left',
                fontSize: 13,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            },
        };

        if (React.Children.count(props.children) === 1
            && !isNaN(props.children)) {
            styles.textAlign = 'right';
        }

        return styles;
    };

    render() {
        const {
            children,
            className,
            columnNumber,
            hoverable,
            onClick,
            onDoubleClick,
            onHover,
            onHoverExit,
            style,
            ...props
        } = this.props;

        const { prepareStyles } = this.context.muiTheme;
        const styles = this.getStyles();

        const handlers = {
            onClick: this.onClick,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
        };

        return (
            <td
                className={className}
                style={prepareStyles(Object.assign(styles.root, style))}
                {...handlers}
                {...props}
            >
                {children}
            </td>
        );
    }
}
