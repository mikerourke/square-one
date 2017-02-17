/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';

/*
 * Internal dependencies
 */
import DataManipulator from 'lib/data-manipulator';
import PageHeader from 'components/page-header';
import Table from 'components/table';

class SearchableListPage extends Component {
    static propTypes = {
        elementButtonsRight: PropTypes.node,
        filterSelections: PropTypes.arrayOf(PropTypes.object),
        handleCellClick: PropTypes.func.isRequired,
        height: PropTypes.number,
        tableColumns: PropTypes.array,
        tableData: PropTypes.array,
    };

    constructor(props, context) {
        super(props, context);
        this.dataManipulator = new DataManipulator();
        this.handleFilterMenuChange= this.handleFilterMenuChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
        this.handleSearchBoxChange= this.handleSearchBoxChange.bind(this);
        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    }

    state = {
        data: this.props.tableData,
        page: 1,
        rowSize: 10,
    };

    handleFilterMenuChange(event, key, payload) {
        console.log(payload);
    }

    handlePageChange(direction) {
        const { goToNextPage, goToPreviousPage } = this.dataManipulator;
        const { page } = this.state;
        let newPage = 0;
        if (direction === 'previous') {
            newPage = goToPreviousPage(page)
        } else {
            newPage = goToNextPage(page)
        }

        this.setState({
            page: newPage,
        });
    }

    handleRowSizeChange(index, value) {
        const { changePageRowSize } = this.dataManipulator;
        this.setState({
            rowSize: changePageRowSize(index, value),
        });
    }

    handleSearchBoxChange(event, newValue) {
        console.log(newValue);
    }

    handleSortOrderChange(field, order) {
        const { getSortedData } = this.dataManipulator;
        this.setState({
            data: getSortedData(this.state.data, field, order),
        });
    }

    render() {
        const {
            handleCellClick,
            tableColumns,
            tableData,
            ...props,
        } = this.props;

        const { ...state } = this.state;

        return (
            <div>
                <PageHeader
                    handleFilterMenuChange={this.handleFilterMenuChange}
                    handleSearchBoxChange={this.handleSearchBoxChange}
                    {...props}
                />
                <Table
                    columns={tableColumns}
                    handleCellClick={handleCellClick}
                    handlePageChange={this.handlePageChange}
                    handleRowSizeChange={this.handleRowSizeChange}
                    handleSortOrderChange={this.handleSortOrderChange}
                    {...state}
                />
            </div>
        );
    }
}

export default SearchableListPage;
