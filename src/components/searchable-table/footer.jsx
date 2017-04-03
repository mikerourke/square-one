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
import React, { Component } from 'react';
import styled from 'styled-components';
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
    handleRowSizeChange: (event: Event, key?: number, value: number) => void,
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

const ControlGroupContainer = styled.div`
    align-items: center;
    color: ${accent3Color};
    display: flex;
    font-size: 12px;
    margin-left: auto;
`;

const ControlWrapper = styled.div`
    align-items: center;
    display: flex;
    margin: 0 8px;
`;

const PaginationButtonsContainer = styled.div`
    align-items: center;
    display: flex;
    margin-left: 24px;
`;

/**
 * Represents the footer toolbar that handles pagination.
 * @export
 * @class Footer
 */
class Footer extends Component<*, Props, *> {
    props: Props;

    /**
     * Returns pagination details and previous/next page button enablement
     *      to apply to the footer elements.
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

        const pageButtonStyle = {
            marginLeft: 4,
            marginRight: 4,
            minWidth: 24,
            opacity: 0.54,
            width: 24,
        };

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
                        {[10, 30, 50, 100].map(rowSizeOption => (
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
                    <PaginationButtonsContainer>
                        <FlatButton
                            icon={(<FontIcon className="material-icons">
                                       chevron_left
                                   </FontIcon>)}
                            style={pageButtonStyle}
                            onClick={handlePreviousPageClick}
                            disabled={previousButtonDisabled}
                        />
                        <FlatButton
                            icon={(<FontIcon className="material-icons">
                                       chevron_right
                                   </FontIcon>)}
                            style={pageButtonStyle}
                            onClick={handleNextPageClick}
                            disabled={nextButtonDisabled}
                        />
                    </PaginationButtonsContainer>
                </ControlGroupContainer>
            </Toolbar>
        );
    }
}

export default Footer;
