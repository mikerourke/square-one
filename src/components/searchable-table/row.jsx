/* @flow */

/* External dependencies */
import React from 'react';
import { TableRow } from 'material-ui/Table';

/**
 * Represents a row of data in the table body.
 * @export
 * @class Row
 */
export default class Row extends TableRow {
    props: {
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

    getStyles = (): Object => {
        const { hovered, striped, displayBorder } = (this.props: Object);
        const { muiTheme: { tableRow } } = (this.context: Object);

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

        const { muiTheme: { prepareStyles } } = (this.context: Object);
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
                style={prepareStyles(Object.assign(styles.root, style))}
                {...props}
            >
                {rowColumns}
            </tr>
        );
    }
}
