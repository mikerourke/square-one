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
import React, { Component } from 'react';
import glamorous from 'glamorous';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar } from 'material-ui/Toolbar';

/* Internal dependencies */
import {
  accent3Color,
  borderColor,
  canvasColor,
} from 'style/mui/palette';

/* Types */
type Props = {
  handleNextPageClick: () => void,
  handlePreviousPageClick: () => void,
  handleRowSizeChange: (event: Event, key: number, value: number) => void,
  page: number,
  recordCount: number,
  rowSize: number,
};

type Pagination = {
  start: number,
  end: number,
  previousButtonDisabled: boolean,
  nextButtonDisabled: boolean,
};

/**
 * Represents the footer toolbar that handles pagination.
 * @export
 * @class Footer
 */
class Footer extends Component<*, Props, *> {
  props: Props;

  /**
   * Returns pagination details and previous/next page button enablement
   *    to apply to the footer elements.
   * @returns {Pagination} Properties to apply to the pagination elements.
   */
  getPaginationDetails = (): Pagination => {
    const { page, recordCount, rowSize } = this.props;

    let start = ((page - 1) * rowSize) + 1;
    let previousButtonDisabled = (page === 1);
    if (recordCount === 0) {
      start = 0;
      previousButtonDisabled = true;
    } else if (start > recordCount) {
      start = 1;
      previousButtonDisabled = true;
    }

    let end = ((page - 1) * rowSize) + rowSize;
    let nextButtonDisabled = false;
    if (end >= recordCount) {
      end = recordCount;
      nextButtonDisabled = true;
    }

    return {
      start,
      end,
      previousButtonDisabled,
      nextButtonDisabled,
    };
  };

  render(): React.Element<*> {
    const {
      handleNextPageClick,
      handlePreviousPageClick,
      handleRowSizeChange,
      recordCount,
      rowSize,
    } = this.props;

    const {
      start,
      end,
      previousButtonDisabled,
      nextButtonDisabled,
    } = this.getPaginationDetails();

    // Number of rows to display in the table.  These are hard coded, but they
    // can be passed as props later.
    const rowCountOptions = [10, 30, 50, 100];

    const pageButtonStyle = {
      marginLeft: 4,
      marginRight: 4,
      minWidth: 24,
      opacity: 0.54,
      width: 24,
    };

    const { div } = glamorous;
    const sharedStyle = { alignItems: 'center', display: 'flex' };
    const ControlGroupContainer = div({
      ...sharedStyle,
      color: accent3Color,
      fontSize: 12,
      marginLeft: 'auto',
    });
    const ControlWrapper = div({ ...sharedStyle, margin: '0 8px' });
    const ButtonsContainer = div({ ...sharedStyle, marginLeft: 24 });

    return (
      <Toolbar
        style={{
          backgroundColor: canvasColor,
          borderTop: `1px solid ${borderColor}`,
          padding: 0,
        }}
      >
        <ControlGroupContainer>
          <ControlWrapper>
            <div>Rows per page:</div>
          </ControlWrapper>
          <DropDownMenu
            labelStyle={{
              color: accent3Color,
              fontSize: 12,
            }}
            listStyle={{ fontSize: 12 }}
            menuItemStyle={{ fontSize: 12 }}
            menuStyle={{ paddingRight: 52 }}
            onChange={handleRowSizeChange}
            style={{ height: 'inherit' }}
            underlineStyle={{ display: 'none' }}
            value={rowSize}
          >
            {rowCountOptions.map(rowSizeOption => (
              <MenuItem
                key={rowSizeOption}
                value={rowSizeOption}
                primaryText={rowSizeOption}
              />
            ))}
          </DropDownMenu>
          <ControlWrapper>
            <div>{`${start} - ${end} of ${recordCount}`}</div>
          </ControlWrapper>
          <ButtonsContainer>
            <FlatButton
              disabled={previousButtonDisabled}
              icon={(<FontIcon className="material-icons">
                chevron_left
              </FontIcon>)}
              onClick={handlePreviousPageClick}
              style={pageButtonStyle}
            />
            <FlatButton
              disabled={nextButtonDisabled}
              icon={(<FontIcon className="material-icons">
                chevron_right
              </FontIcon>)}
              onClick={handleNextPageClick}
              style={pageButtonStyle}
            />
          </ButtonsContainer>
        </ControlGroupContainer>
      </Toolbar>
    );
  }
}

export default Footer;
