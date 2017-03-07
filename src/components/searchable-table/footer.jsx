/* @flow */

/* External dependencies */
import React from 'react';
import styled from 'styled-components';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar } from 'material-ui/Toolbar';

export default class Footer extends React.Component {

    render() {
        return (
            <Toolbar style={styles.footerToolbar}>
                <div style={styles.footerControlGroup}>
                    <div style={styles.footerToolbarItem}>
                        <div>{rowSizeLabel}</div>
                    </div>
                    <DropDownMenu
                        labelStyle={styles.rowSizeMenu}
                        value={rowSize}
                        onChange={this.handleRowSizeChange}
                    >
                        {rowSizeList.map((rowSize) => {
                            return (
                                <MenuItem
                                    key={rowSize}
                                    value={rowSize}
                                    primaryText={rowSize}
                                />
                            );
                        })}
                    </DropDownMenu>
                    <div style={styles.footerToolbarItem}>
                        <div>{summaryLabelTemplate(start, end, totalCount)}</div>
                    </div>
                    <div
                        style={Object.assign(styles.paginationButtons, styles.footerToolbarItem)}>
                        <FlatButton
                            icon={<ChevronLeft />}
                            style={styles.paginationButton}
                            onClick={this.handlePreviousPageClick}
                            disabled={previousButtonDisabled}
                        />
                        <FlatButton
                            icon={<ChevronRight />}
                            style={styles.paginationButton}
                            onClick={this.handleNextPageClick}
                            disabled={nextButtonDisabled}
                        />
                    </div>
                </div>
            </Toolbar>
        );
    }
}
