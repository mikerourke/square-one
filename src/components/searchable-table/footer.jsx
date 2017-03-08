/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar } from 'material-ui/Toolbar';

import {
    accent3Color,
    borderColor,
    canvasColor,
} from 'style/mui/palette';

const ControlGroupContainer = styled.div`
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
export default class Footer extends React.Component {
    props: {
        handleNextPageClick: () => void,
        handlePreviousPageClick: () => void,
        handleRowSizeChange: (index?: number, value: number) => void,
        recordCount: number,
        rowSize: number,
    };

    state: {
        page: number,
        rowSize: number,
    };

    constructor(props: any) {
        super(props);
        this.state = {
            page: 1,
            rowSize: this.props.rowSize,
        };
    }

    getPaginationDetails = (): Object => {
        const { recordCount } = this.props;
        const { page, rowSize } = this.state;

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
            end,
            nextButtonDisabled,
            previousButtonDisabled,
            start,
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
            end,
            nextButtonDisabled,
            previousButtonDisabled,
            start,
        } = this.getPaginationDetails();

        return (
            <Toolbar
                style={{
                    backgroundColor: canvasColor,
                    borderTop: `1px solid ${borderColor}`,
                }}
            >
                <ControlGroupContainer>
                    <ControlWrapper>
                        <div>Rows per page:</div>
                    </ControlWrapper>
                    <DropDownMenu
                        labelStyle={{ color: accent3Color }}
                        onChange={handleRowSizeChange}
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
                            style={{ opacity: 0.54 }}
                            onClick={handlePreviousPageClick}
                            disabled={previousButtonDisabled}
                        />
                        <FlatButton
                            icon={(<FontIcon className="material-icons">
                                       chevron_right
                                   </FontIcon>)}
                            style={{ opacity: 0.54 }}
                            onClick={handleNextPageClick}
                            disabled={nextButtonDisabled}
                        />
                    </PaginationButtonsContainer>
                </ControlGroupContainer>
            </Toolbar>
        );
    }
}
