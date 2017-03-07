/* @flow */

/* External dependencies */
import React from 'react';
import { TableBody } from 'material-ui/Table';

export default class Body extends TableBody {
    props: {
        allRowsSelected?: boolean,
        children?: React.Element<*>,
        className?: string,
        deselectOnClickaway?: boolean,
        displayRowCheckbox?: boolean,
        onCellHover?: () => void,
        onCellHoverExit?: () => void,
        onRowHover?: () => void,
        onRowHoverExit?: () => void,
        preScanRows?: boolean,
        showRowHover?: boolean,
        stripedRows?: boolean,
        style?: Object,
    };

    static defaultProps = {
        deselectOnClickaway: false,
        displayRowCheckbox: false,
        selectable: false,
    };

    static muiName = 'TableBody';

    createRows(): React.Element<*> {
        const numChildren = React.Children.count(this.props.children);
        let rowNumber = 0;
        const handlers = {
            onCellHover: this.onCellHover,
            onCellHoverExit: this.onCellHoverExit,
            onRowHover: this.onRowHover,
            onRowHoverExit: this.onRowHoverExit,
            onRowClick: this.onRowClick,
        };

        return React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                const props = {
                    hoverable: this.props.showRowHover,
                    striped: this.props.stripedRows && (rowNumber % 2 === 0),
                    rowNumber: rowNumber += 1,
                };

                if (rowNumber === numChildren) {
                    props.displayBorder = false;
                }

                const children = [
                    this.createRowCheckboxColumn(props),
                ];

                React.Children.forEach(child.props.children, (grandChild) => {
                    children.push(grandChild);
                });

                return React.cloneElement(child, { ...props, ...handlers },
                    children);
            }
            return undefined;
        });
    }
}
