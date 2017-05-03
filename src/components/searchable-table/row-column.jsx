/* @flow */

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

/* External dependencies */
import React from 'react';
import { TableRowColumn } from 'material-ui/Table';

/* Types */
type Context = {
    muiTheme: {
        prepareStyles: (style: Object) => void,
        tableRowColumn: {
            height: number,
            spacing: number,
        }
    }
};

type Props = {
    children?: React.Element<*>,
    className?: string,
    columnNumber?: number,
    hoverable?: boolean,
    onClick?: () => void,
    onHover?: () => void,
    onHoverExit?: () => void,
    style?: Object,
};

/**
 * Represents a column within a row of the table body.
 * @export
 * @class RowColumn
 */
class RowColumn extends TableRowColumn {
    context: Context;
    props: Props;

    static muiName = 'TableRowColumn';

    getRootStyle = (): Object => {
        const { children } = this.props;
        const { muiTheme: {
            tableRowColumn,
        } } = this.context;

        const isRightAlign = (React.Children.count(children) === 1
                              && !isNaN(children));

        return {
            fontSize: 13,
            height: tableRowColumn.height,
            overflow: 'hidden',
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

        const { muiTheme: {
            prepareStyles,
        } } = this.context;
        const rootStyle = this.getRootStyle();

        const handlers = {
            onClick: this.onClick,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
        };

        return (
            <td
                className={className}
                style={prepareStyles({ ...rootStyle, ...style })}
                {...handlers}
                {...props}
            >
                {children}
            </td>
        );
    }
}

export default RowColumn;
