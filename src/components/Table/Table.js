/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import DataTables from 'material-ui-datatables';

/*
 * Internal dependencies
 */
import { inline } from 'style/mui';

class Table extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        handleCellClick: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.startingData = props.data;

        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    }

    state = {
        data: this.props.data,
        page: 1,
        rowSize: 10,
    };

    handleFilterValueChange(value) {
        const rows = this.startingData;
        let filteredList = [];
        if (!value || value === '') {
            filteredList = this.startingData;
        } else {
            filteredList = rows.filter((rowItem) => {
                let countFound = 0;
                Object.keys(rowItem).forEach((key) => {
                    const rowValue = rowItem[key].toString().toLowerCase();
                    if (rowValue.includes(value.toLowerCase())) {
                        countFound += 1;
                    }
                });
                return (countFound > 0);
            });
        }

        this.setState({ data: filteredList });
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

    handleSortOrderChange(key, order) {
        const rows = this.state.data.slice();
        const sortedList = rows.sort((a, b) => {
            let sortValue = (a[key] > b[key]) ? 1 : -1;
            if (order === 'desc') {
                sortValue *= -1;
            }
            return sortValue;
        });

        this.setState({ data: sortedList });
    }

    render() {
        const { columns, handleCellClick, title } = this.props;
        const { data, page, rowSize } = this.state;
        return (
            <Paper
                style={{
                    ...inline.paper,
                    top: '-58px',
                    padding: 0,
                }}
            >
                <DataTables
                    columns={columns}
                    count={rowSize}
                    data={data}
                    height={'auto'}
                    onCellClick={handleCellClick}
                    onFilterValueChange={this.handleFilterValueChange}
                    onNextPageClick={this.handleNextPageClick}
                    onPreviousPageClick={this.handlePreviousPageClick}
                    onRowSizeChange={this.handleRowSizeChange}
                    onSortOrderChange={this.handleSortOrderChange}
                    page={page}
                    rowSize={rowSize}
                    selectable={false}
                    showCheckboxes={false}
                    showHeaderToolbar={false}
                    showRowHover={true}
                    title={title}
                />
            </Paper>
        );
    }
}

export default Table;
