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
import { TableBody } from 'material-ui/Table';

/* Types */
type DefaultProps = {
  allRowsSelected: boolean,
  deselectOnClickaway: boolean,
  displayRowCheckbox: boolean,
  selectable: boolean,
}

type Props = {
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

/**
 * Represents the body of the table that contains data rows.
 * @export
 * @class Body
 */
class Body extends TableBody<DefaultProps, Props, *> {
  props: Props;

  static defaultProps = {
    allRowsSelected: false,
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
      onRowClick: this.onRowClick,
      onRowHover: this.onRowHover,
      onRowHoverExit: this.onRowHoverExit,
    };

    return React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        const props = {
          displayBorder: true,
          hoverable: this.props.showRowHover,
          rowNumber: rowNumber += 1,
          striped: this.props.stripedRows && (rowNumber % 2 === 0),
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

export default Body;
