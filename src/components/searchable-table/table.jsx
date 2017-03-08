/* @flow */

/* eslint-disable react/no-array-index-key */

/* External dependencies */
import React from 'react';
import { List } from 'immutable';
import { Table as MuiTable, TableHeader } from 'material-ui/Table';

/* Internal dependencies */
import Body from './body';
import Footer from './footer';
import HeaderColumn from './header-column';
import Row from './row';
import RowColumn from './row-column';

export default class Table extends React.Component {
    props: {
        columns: Array<any>,
        data: List<*>,
        fixedFooter?: boolean,
        fixedHeader?: boolean,
        handleNextPageClick: () => void,
        handlePreviousPageClick: () => void,
        handleRowSizeChange: (index?: number, value: number) => void,
        handleSortOrderChange?: (key: string, order: string) => void,
        height?: string,
        page?: number,
        rowSize?: number,
        showRowHover?: boolean,
        stripedRows?: boolean,
    };

    state: {
        sortColumn: string,
        sortOrder: string,
    };

    static defaultProps = {
        columns: [],
        data: new List(),
        fixedFooter: false,
        fixedHeader: false,
        height: 'inherit',
        page: 1,
        showRowHover: false,
        stripedRows: false,
    };

    static muiName = 'Table';

    constructor(props: any, context: any): void {
        super(props, context);
        this.state = {
            sortColumn: '',
            sortOrder: 'asc',
        };
    }

    handleHeaderColumnClick = (
        event: Event,
        rowIndex: number,
        columnIndex: number,
    ): void => {
        const { columns, handleSortOrderChange } = this.props;
        const adjustedColumnIndex = columnIndex - 1;
        const column = columns[adjustedColumnIndex];
        if (column && column.sortable) {
            const { sortColumn, sortOrder } = this.state;
            const key = column.key;
            const order = sortColumn === column.key && sortOrder === 'asc'
                          ? 'desc'
                          : 'asc';
            this.setState({
                sortColumn: key,
                sortOrder: order,
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
            handleNextPageClick,
            handlePreviousPageClick,
            handleRowSizeChange,
            height,
            page,
            rowSize,
            showRowHover,
            stripedRows,
            ...props
        } = this.props;
        const { sortColumn, sortOrder } = this.state;

        // This fails the type check even though it's a valid statement:
        // $FlowIgnore
        const recordCount = (List.isList(data)) ? data.count() : data.length;

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
                            {columns.map((row, index) => (
                                <HeaderColumn
                                    className={row.className}
                                    key={index}
                                    order={sortColumn === row.key
                                        ? sortOrder
                                        : 'asc'}
                                    sortable={row.sortable}
                                    sorted={sortColumn === row.key}
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
                        showRowHover={showRowHover}
                        stripedRows={stripedRows}
                    >
                        {data.map((row, rowIndex) => (
                            <Row key={rowIndex}>
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
                    recordCount={recordCount}
                    rowSize={rowSize}
                />
            </div>
        );
    }
}
