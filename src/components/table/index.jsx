// @flow

/* External dependencies */
import React from 'react';
import DataTables from 'material-ui-datatables';
import Paper from 'material-ui/Paper';

/* Internal dependencies */
import TableToolbar from './toolbar';

/* Types */
import type { Selection } from '../../types';

type Column = {
    key: string,
    label: string,
    sortable?: boolean,
    style: Object,
};

/**
 * Table with pagination, sorting, and filtering capabilities.
 */
class Table extends React.Component {
    props: {
        columns: Array<Column>,
        data: Array<Object>,
        filterSelections: Array<Selection>,
        handleCellClick: (rowIndex: number, columnIndex: number,
                          row: Object, column: Object) => void,
    };

    state: {
        data: Array<Object>,
        page: number,
        rowSize: number,
    };

    static defaultProps = {
        data: [],
        filterSelections: [],
    };

    constructor(props: any) {
        super(props);

        this.state = {
            data: this.props.data,
            page: 1,
            rowSize: 10,
        };

        (this: any).handleFilterMenuChange =
            this.handleFilterMenuChange.bind(this);
        (this: any).handleNextPageClick =
            this.handleNextPageClick.bind(this);
        (this: any).handlePreviousPageClick =
            this.handlePreviousPageClick.bind(this);
        (this: any).handleRowSizeChange =
            this.handleRowSizeChange.bind(this);
        (this: any).handleSearchBoxChange =
            this.handleSearchBoxChange.bind(this);
        (this: any).handleSortOrderChange =
            this.handleSortOrderChange.bind(this);
    }

    handleFilterMenuChange(event: Event, key: string, value: string) {
        // TODO: Write code to handle filter menu.
    }

    handleNextPageClick() {
        // TODO: Add functionality to handle going to the next page.
        // Note: This will need to accommodate for the row count displayed.
        const nextPage = this.state.page + 1;
        this.setState({
            page: nextPage,
        });
    }

    handlePreviousPageClick() {
        // TODO: Add function to handle going to the previous page.
        // Note: This will need to accommodate for the row count displayed.
        const currentPage = this.state.page;
        const previousPage = (currentPage === 1) ? 1 : currentPage - 1;
        this.setState({
            page: previousPage,
        });
    }

    handleRowSizeChange(index?: number, value: number) {
        // TODO: Ensure this doesn't cause issues with page count.
        this.setState({
            rowSize: value,
        });
    }

    handleSearchBoxChange(event: Event, newValue: string) {
        const initialData = this.props.data;
        const rows = initialData;
        let filteredList = [];
        if (!newValue || newValue === '') {
            filteredList = initialData;
        } else {
            filteredList = rows.filter((rowItem) => {
                let countFound = 0;
                Object.keys(rowItem).forEach((key) => {
                    const rowValue = rowItem[key].toString().toLowerCase();
                    if (rowValue.includes(newValue.toLowerCase())) {
                        countFound += 1;
                    }
                });
                return (countFound > 0);
            });
        }
        this.setState({ data: filteredList });
    }

    handleSortOrderChange(key: string, order: string) {
        const sortedList = this.state.data.slice().sort((a, b) => {
            let sortValue = (a[key] > b[key]) ? 1 : -1;
            if (order === 'desc') {
                sortValue *= -1;
            }
            return sortValue;
        });
        this.setState({ data: sortedList });
    }

    render() {
        const {
            handleCellClick,
            columns,
            filterSelections,
        } = this.props;

        const { ...state } = this.state;
        return (
            <div>
                <TableToolbar
                    handleFilterMenuChange={this.handleFilterMenuChange}
                    handleSearchBoxChange={this.handleSearchBoxChange}
                    filterSelections={filterSelections}
                />
                <Paper
                    style={{
                        maxWidth: 1200,
                        margin: '24px auto',
                        padding: 0,
                        top: 0,
                        width: '95%',
                    }}
                >
                    <DataTables
                        columns={columns}
                        count={20}
                        height={'auto'}
                        onCellClick={handleCellClick}
                        onNextPageClick={this.handleNextPageClick}
                        onPreviousPageClick={this.handlePreviousPageClick}
                        onRowSizeChange={this.handleRowSizeChange}
                        onSortOrderChange={this.handleSortOrderChange}
                        selectable={false}
                        showCheckboxes={false}
                        showHeaderToolbar={false}
                        showRowHover={true}
                        {...state}
                    />
                </Paper>
            </div>
        );
    }
}

export default Table;
