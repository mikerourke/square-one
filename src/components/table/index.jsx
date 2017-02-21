/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import DataTables from 'material-ui-datatables';
import Paper from 'material-ui/Paper';

/*
 * Internal dependencies
 */
import TableToolbar from './toolbar';

/**
 * Table with pagination, sorting, and filtering capabilities.
 */
class Table extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        data: PropTypes.array,
        filterSelections: PropTypes.array,
        handleCellClick: PropTypes.func.isRequired,
    };

    static defaultProps = {
        data: [],
        filterSelections: [],
    };

    constructor(props, context) {
        super(props, context);
        this.startingData = props.data;

        this.handleFilterMenuChange = this.handleFilterMenuChange.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    }

    state = {
        data: this.props.data,
        page: 1,
        rowSize: 10,
    };

    handleFilterMenuChange(event, key, payload) {
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

    handleRowSizeChange(index, value) {
        // TODO: Ensure this doesn't cause issues with page count.
        this.setState({
            rowSize: value,
        });
    }

    handleSearchBoxChange(event, newValue) {
        const rows = this.startingData;
        let filteredList = [];
        if (!newValue || newValue === '') {
            filteredList = this.startingData;
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

    handleSortOrderChange(key, order) {
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
