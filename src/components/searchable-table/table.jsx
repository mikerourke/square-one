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

/* eslint-disable react/no-array-index-key */

/* External dependencies */
import React, { Component } from 'react';
import { List } from 'immutable';
import { Table as MuiTable, TableHeader } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';
import Body from './body';
import Footer from './footer';
import HeaderColumn from './header-column';
import Row from './row';
import RowColumn from './row-column';

/* Types */
import type { Sort } from './index';

type DefaultProps = {
    columns: Array<any>,
    data: List<*>,
    fixedFooter: boolean,
    fixedHeader: boolean,
    height: string,
    initialSort: Sort,
    page: number,
    showRowHover: boolean,
    stripedRows: boolean,
};

type Props = {
    columns: Array<any>,
    data: List<*>,
    fixedFooter?: boolean,
    fixedHeader?: boolean,
    handleRowIconTouchTap: (row: Object) => void,
    handleNextPageClick: () => void,
    handlePreviousPageClick: () => void,
    handleRowSizeChange: (event: Event, key: number, value: number) => void,
    handleSortOrderChange?: (key: string, order: string) => void,
    height?: string,
    initialSort?: Sort,
    page?: number,
    recordCount: number,
    rowSize?: number,
    showRowHover?: boolean,
    stripedRows?: boolean,
};

type State = {
    sort: Sort,
};

class Table extends Component<DefaultProps, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        columns: [],
        data: new List(),
        fixedFooter: false,
        fixedHeader: false,
        height: 'inherit',
        initialSort: {
            column: '',
            order: 'asc',
        },
        page: 1,
        showRowHover: false,
        stripedRows: false,
    };

    static muiName = 'Table';

    constructor(props: Props): void {
        super(props);
        const { initialSort = {
            column: '',
            order: 'asc',
        } } = this.props;
        this.state = {
            sort: initialSort,
        };
    }

    handleHeaderColumnClick = (
        event: Event,
        rowIndex: number,
        columnIndex: number,
    ): void => {
        const { columns, handleSortOrderChange } = this.props;
        const adjustedColumnIndex = (columnIndex - 2);
        const column = columns[adjustedColumnIndex];
        if (column && column.sortable) {
            const { sort } = this.state;
            const key = column.key;
            const order = (sort.column === column.key && sort.order === 'asc')
                          ? 'desc'
                          : 'asc';
            this.setState({
                sort: {
                    column: key,
                    order,
                },
            });
            if (handleSortOrderChange) {
                handleSortOrderChange(key, order);
            }
        }
    };

    render(): React.Element<*> {
        const {
            columns,
            data,
            fixedFooter,
            fixedHeader,
            handleRowIconTouchTap,
            handleNextPageClick,
            handlePreviousPageClick,
            handleRowSizeChange,
            height,
            page,
            recordCount,
            rowSize,
            showRowHover,
            stripedRows,
            ...props // eslint-disable-line
        } = this.props;
        const { sort } = this.state;

        return (
            <div>
                <MuiTable
                    height={height}
                    fixedFooter={fixedFooter}
                    fixedHeader={fixedHeader}
                >
                    <TableHeader
                        adjustForCheckbox={false}
                        displaySelectAll={false}
                        enableSelectAll={false}
                    >
                        <Row onCellClick={this.handleHeaderColumnClick}>
                            <HeaderColumn
                                key="icons"
                                style={{
                                    paddingLeft: 8,
                                    width: 48,
                                }}
                            />
                            {columns.map((row, index) => (
                                <HeaderColumn
                                    className={row.className}
                                    key={index}
                                    order={sort.column === row.key
                                        ? sort.order
                                        : 'asc'}
                                    sortable={row.sortable}
                                    sorted={sort.column === row.key}
                                    style={Object.assign({},
                                        { fontWeight: 600 },
                                        row.style || {})}
                                    tooltip={row.tooltip}
                                >
                                    <span>{row.label}</span>
                                </HeaderColumn>
                            ), this)}
                        </Row>
                    </TableHeader>
                    <Body
                        deselectOnClickaway={false}
                        displayRowCheckbox={false}
                        preScanRows={false}
                        showRowHover={showRowHover}
                        stripedRows={stripedRows}
                    >
                        {data.map((row, rowIndex) => (
                            <Row key={rowIndex}>
                                <RowColumn
                                    key="icons"
                                    style={{
                                        paddingLeft: 8,
                                        width: 48,
                                    }}
                                >
                                    <IconButton
                                        iconClassName="material-icons"
                                        iconStyle={{ color: primary1Color }}
                                        onTouchTap={
                                            () => handleRowIconTouchTap(row)
                                        }
                                    >
                                        mode_edit
                                    </IconButton>
                                </RowColumn>
                                {columns.map((column, columnIndex) => (
                                    <RowColumn
                                        key={columnIndex}
                                        style={column.style}
                                    >
                                        {row[column.key]}
                                    </RowColumn>
                                ))}
                            </Row>
                        ))}
                    </Body>
                </MuiTable>
                <Footer
                    handleNextPageClick={handleNextPageClick}
                    handlePreviousPageClick={handlePreviousPageClick}
                    handleRowSizeChange={handleRowSizeChange}
                    page={page}
                    recordCount={recordCount}
                    rowSize={rowSize}
                />
            </div>
        );
    }
}

export default Table;
