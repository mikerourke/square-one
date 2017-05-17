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
import glamorous from 'glamorous';
import FontIcon from 'material-ui/FontIcon';
import { TableHeaderColumn } from 'material-ui/Table';
import Tooltip from 'material-ui/internal/Tooltip';

/* Types */
type Context = {
  muiTheme: {
    prepareStyles: (style: Object) => void,
    tableHeaderColumn: {
      height: number,
      spacing: number,
      textColor: string
    }
  }
};

type DefaultProps = {
  sortable: boolean,
  order: 'asc' | 'desc',
};

type Props = {
  alignRight: boolean,
  children?: React.Element<*>,
  className?: string,
  columnNumber?: number,
  hoverable?: boolean,
  onClick?: () => void,
  onHover?: () => void,
  onHoverExit?: () => void,
  order?: 'asc' | 'desc',
  sortable?: boolean,
  sorted?: boolean,
  style?: Object,
  tooltip?: string,
};

/**
 * Represents a column in the table header.
 * @export
 * @class HeaderColumn
 */
class HeaderColumn extends TableHeaderColumn<DefaultProps, Props, *> {
  props: Props;
  context: Context;

  static defaultProps = {
    sortable: false,
    order: 'asc',
  };

  static muiName = 'TableHeaderColumn';

  constructor(props: Props, context: Context): void {
    super(props, context);
    this.state = {
      sortHovered: false,
    };
  }

  /**
   * Changes the cursor into a pointer when hovering over the column name if
   *    the column is sortable.
   */
  onMouseEnter = (): void => {
    const { sortable, tooltip } = this.props;
    if (tooltip !== undefined) {
      this.setState({ hovered: true });
    }
    if (sortable) {
      this.setState({ sortHovered: true });
    }
  };

  /**
   * If the cursor was changed into a pointer in the onMouseEnter method, this
   *    changes it back to the default.
   */
  onMouseLeave = (): void => {
    const { sortable, tooltip } = this.props;
    if (tooltip !== undefined) {
      this.setState({ hovered: false });
    }
    if (sortable) {
      this.setState({ sortHovered: false });
    }
  };

  /**
   * Extrapolates the material-ui theme elements from the context and creates
   *    an object with the corresponding styles.
   * @returns {Object} Object with styles based on theme.
   */
  getRootStyle = (): Object => {
    const {
      alignRight,
      sortable,
      sorted,
    } = this.props;
    const {
      muiTheme: {
        tableHeaderColumn,
      },
    } = this.context;

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

  render(): React.Element<*> {
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

    // Get the styles to apply to the components.
    const {
      muiTheme: {
        prepareStyles,
      },
    } = this.context;
    const rootStyle = this.getRootStyle();

    // Create custom Glamorous components based on the styles.
    const { div } = glamorous;
    const sharedStyle = {
      display: 'inline-block',
      verticalAlign: 'middle',
    };
    const IconWrapper = div({
      ...sharedStyle,
      height: 16,
      margin: '0 8px',
      width: 16,
    });
    const TitleWrapper = div(sharedStyle);

    // If there is a tooltip associated with the column, create the
    // corresponding Tooltip component.
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

    // Determine the Material icon to use based on whether or not the column
    // is currently sorted and the order in which it is sorted.
    let sortIconName = '';
    if (sorted && order === 'asc') {
      sortIconName = 'arrow_upward';
    } else if (sorted && order === 'desc') {
      sortIconName = 'arrow_downward';
    } else if (sortable) {
      sortIconName = 'arrow_upward';
    }

    // If the column is sorted, create the corresponding Icon component to
    // display next to the column header text.
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

    // If the column is sortable, assign the applicable sort icon component
    // based on the sort order.
    let leftSortIcon;
    let rightSortIcon;
    if (sortable && rootStyle.textAlign === 'left') {
      rightSortIcon = sortIcon;
    } else if (sortable && rootStyle.textAlign === 'right') {
      leftSortIcon = sortIcon;
    }

    // Get handlers for component, the onClick event was specified as a prop.
    const handlers = {
      onClick: this.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
    };

    return (
      <th
        className={className}
        style={prepareStyles({ ...rootStyle, ...style })}
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

export default HeaderColumn;
