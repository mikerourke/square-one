/* @flow */

/* External dependencies */
import React from 'react';
import { TableRowColumn } from 'material-ui/Table';

/**
 * Represents a column within a row of the table body.
 * @export
 * @class RowColumn
 */
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

    getRootStyle = (): Object => {
        const { children } = (this.props: Object);
        const { muiTheme: { tableRowColumn } } = (this.context: Object);

        const isRightAlign = (React.Children.count(children) === 1
                              && !isNaN(children));

        return {
            fontSize: 13,
            height: tableRowColumn.height,
            paddingLeft: tableRowColumn.spacing,
            paddingRight: tableRowColumn.spacing,
            textAlign: isRightAlign ? 'right' : 'left',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        };
    };

    render(): React.Element<*> {
        const {
            children,
            className,
            columnNumber,
            hoverable,
            onClick,
            onHover,
            onHoverExit,
            style,
            ...props
        } = this.props;

        const { prepareStyles } = this.context.muiTheme;
        const rootStyle = this.getRootStyle();

        const handlers = {
            onClick: this.onClick,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
        };

        return (
            <td
                className={className}
                style={prepareStyles(Object.assign(rootStyle, style))}
                {...handlers}
                {...props}
            >
                {children}
            </td>
        );
    }
}
