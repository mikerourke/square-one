/* @flow */

/**
 * This code was taken from the material-ui-datatables library and modified
 *    slightly to use the styled-components library.  I also stripped the
 *    comments for each prop and removed some of the code that allowed for
 *    customization.  I copied and modified the code because all of the
 *    material-ui library components that the material-ui-datatables library
 *    depended on were being tacked on to my Webpack bundle, rather than
 *    being pulled from the version that my project depends on.  This was
 *    adding more than 500kb to the bundle size.
 * @see https://github.com/hyojin/material-ui-datatables
 */

/* External dependencies */
import React from 'react';
import { TableRow } from 'material-ui/Table';

/* Types */
type Context = {
    muiTheme: {
        prepareStyles: (style: Object) => void,
        tableRow: {
            borderColor: string,
            height: number,
            overColor: string,
            spacing: number,
            stripeColor: string,
            textColor: string,
        }
    }
};

type Props = {
    children?: React.Element<*>,
    className?: string,
    displayBorder?: boolean,
    hoverable?: boolean,
    hovered?: boolean,
    onCellClick?: () => void,
    onCellHover?: () => void,
    onCellHoverExit?: () => void,
    onRowClick?: () => void,
    onRowHover?: () => void,
    onRowHoverExit?: () => void,
    rowNumber?: number,
    selectable?: boolean,
    striped?: boolean,
    style?: Object,
};

/**
 * Represents a row of data in the table body.
 * @export
 * @class Row
 */
class Row extends TableRow {
    context: Context;
    props: Props;

    getStyles = (): Object => {
        const {
            hovered,
            striped,
            displayBorder,
        } = this.props;
        const { muiTheme: {
            tableRow,
        } } = this.context;

        let cellBgColor = 'inherit';
        if (hovered || this.state.hovered) {
            cellBgColor = tableRow.overColor;
        } else if (striped) {
            cellBgColor = tableRow.stripeColor;
        }

        return {
            root: {
                borderBottom: displayBorder
                              && `1px solid ${tableRow.borderColor}`,
                color: tableRow.textColor,
                height: tableRow.height,
            },
            cell: {
                backgroundColor: cellBgColor,
            },
        };
    };

    render() {
        const {
            className,
            displayBorder,
            hoverable,
            hovered,
            onCellClick,
            onCellHover,
            onCellHoverExit,
            onRowClick,
            onRowHover,
            onRowHoverExit,
            rowNumber,
            selectable,
            striped,
            style,
            ...props
        } = this.props;

        const { muiTheme: {
            prepareStyles,
        } } = this.context;
        const styles = this.getStyles();

        const rowColumns = React.Children.map(this.props.children,
            (child, columnNumber) => {
                if (React.isValidElement(child)) {
                    let numberOfRow = 0;
                    if (rowNumber) {
                        numberOfRow = rowNumber;
                    }
                    return React.cloneElement(child, {
                        columnNumber,
                        hoverable,
                        key: `${numberOfRow.toString()}-${columnNumber}`,
                        onClick: this.onCellClick,
                        onHover: this.onCellHover,
                        onHoverExit: this.onCellHoverExit,
                        style: { ...styles.cell, ...child.props.style },
                    });
                }
                return undefined;
        });

        return (
            <tr
                className={className}
                style={prepareStyles({ ...styles.root, ...style })}
                {...props}
            >
                {rowColumns}
            </tr>
        );
    }
}

export default Row;
