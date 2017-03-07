/* @flow */

/* External dependencies */
import React from 'react';
import { TableRow } from 'material-ui/Table';

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
        striped?: boolean,
        style?: Object,
    };

    getStyles = () => {
        const { context, props, state } = this;
        const { tableRow } = context.muiTheme;

        let cellBgColor = 'inherit';
        if (props.hovered || state.hovered) {
            cellBgColor = tableRow.hoverColor;
        } else if (props.striped) {
            cellBgColor = tableRow.stripeColor;
        }

        return {
            root: {
                borderBottom: props.displayBorder
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

        const { prepareStyles } = this.context.muiTheme;
        const styles = this.getStyles();

        const rowColumns = React.Children.map(this.props.children,
            (child, columnNumber) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        columnNumber,
                        hoverable: this.props.hoverable,
                        key: `${this.props.rowNumber}-${columnNumber}`,
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
