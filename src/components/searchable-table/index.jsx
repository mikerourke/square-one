/* @flow */

/* External dependencies */
import React from 'react';
import { List } from 'immutable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';
import { getSearchResults, getSortedData } from 'lib/query-actions';
import FilterMenu from 'components/filter-menu';
import SearchToolbar from 'components/search-toolbar';
import Table from './table';

/**
 * Column in the data table.
 * @typedef Column
 */
type Column = {
    key: string,
    label: string,
    sortable?: boolean,
    style: Object,
};

/**
 * Table with pagination, sorting, and filtering capabilities.
 * @param {Array} columns Columns to display in the table.
 * @param {List} data Data objects to display in the table.
 * @param {Array} filterSelections Array of items to display in the Filter
 *      menu dropdown.
 */
export default class SearchableTable extends React.Component {
    props: {
        columns: Array<Column>,
        data: List<*>,
        handleAddTouchTap: (event: Event) => void,
        filterSelections: Array<string>,
    };

    state: {
        data: List<*>,
        page: number,
        rowSize: number,
    };

    static defaultProps = {
        filterSelections: [],
    };

    constructor(props: any) {
        super(props);
        this.state = {
            data: this.props.data,
            page: 1,
            rowSize: 10,
        };
    }

    handleFilterMenuChange = (event: Event, key: string, value: string) => {
        // TODO: Write code to handle filter menu.
    };

    handleNextPageClick = (): void => {
        // TODO: Add functionality to handle going to the next page.
        // Note: This will need to accommodate for the row count displayed.
        const nextPage = this.state.page + 1;
        this.setState({
            page: nextPage,
        });
    };

    handlePreviousPageClick = (): void => {
        // TODO: Add function to handle going to the previous page.
        // Note: This will need to accommodate for the row count displayed.
        const currentPage = this.state.page;
        const previousPage = (currentPage === 1) ? 1 : currentPage - 1;
        this.setState({
            page: previousPage,
        });
    };

    handleRowSizeChange = (index?: number, value: number): void => {
        // TODO: Ensure this doesn't cause issues with page count.
        this.setState({
            rowSize: value,
        });
    };

    handleSearchBoxChange = (event: Event, newValue: string): void => {
        const results = getSearchResults(this.props.data, newValue);
        this.setState({ data: results });
    };

    handleSortOrderChange = (key: string, order: string): void => {
        const results = getSortedData(this.props.data, key, order);
        this.setState({ data: results });
    };

    render(): React.Element<*> {
        const {
            columns,
            handleAddTouchTap,
            filterSelections,
        } = this.props;

        const {
            data,
            ...state
        } = this.state;

        return (
            <div>
                <SearchToolbar
                    handleSearchBoxChange={this.handleSearchBoxChange}
                    isStandalone={true}
                >
                    <FilterMenu
                        handleFilterMenuChange={this.handleFilterMenuChange}
                        filterSelections={filterSelections}
                    />
                </SearchToolbar>
                <Paper
                    style={{
                        margin: '24px auto',
                        maxWidth: 1200,
                        padding: 0,
                        top: 0,
                        width: '95%',
                    }}
                >
                    <Table
                        columns={columns}
                        data={data}
                        fixedHeader={true}
                        fixedFooter={false}
                        handleNextPageClick={this.handleNextPageClick}
                        handlePreviousPageClick={this.handlePreviousPageClick}
                        handleRowSizeChange={this.handleRowSizeChange}
                        handleSortOrderChange={this.handleSortOrderChange}
                        showRowHover={true}
                        {...state}
                    />
                </Paper>
                <FloatingActionButton
                    onTouchTap={handleAddTouchTap}
                    secondary={true}
                    style={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                    }}
                >
                    <FontIcon
                        className="material-icons"
                        style={{ fontSize: 32 }}
                    >
                        add
                    </FontIcon>
                </FloatingActionButton>
            </div>
        );
    }
}
