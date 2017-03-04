/* @flow */

/* External dependencies */
import React from 'react';
import { Map } from 'immutable';
import DataTables from 'material-ui-datatables';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';
import { getSearchResults, getSortedData } from 'lib/query-actions';
import FilterMenu from 'components/filter-menu';
import SearchToolbar from 'components/search-toolbar';

/* Types */
import type { Selection } from 'lib/types';
import type { Record } from 'immutable';

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
 * @param {Map} data Data objects to display in the table.
 * @param {Array} filterSelections Array of items to display in the Filter
 *      menu dropdown.
 * @param {Function} handleEditTouchTap Action to perform when the user presses
 *      the Edit button.
 */
export default class Table extends React.Component {
    props: {
        columns: Array<Column>,
        data: Map<number, Record<*>>,
        filterSelections: Array<Selection>,
        handleEditTouchTap: (event: Event, row: Object) => void,
    };

    state: {
        data: Map<number, Record<*>>,
        page: number,
        rowSize: number,
    };

    static defaultProps = {
        data: new Map(),
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

    getTableData = () => {
        const { columns, handleEditTouchTap } = this.props;
        return this.state.data.toArray().map((item) => {
            const tableItem = {};
            columns.forEach((column) => {
                tableItem[column.key] = item.get(column.key);
            });
            tableItem.icons = (
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={{ color: primary1Color }}
                    onTouchTap={event => handleEditTouchTap(event, item)}
                    tooltip="Edit this lead"
                >
                    mode_edit
                </IconButton>
            );
            return tableItem;
        });
    };

    render(): React.Element<*> {
        const {
            columns,
            filterSelections,
        } = this.props;

        const {
            data,
            ...state
        } = this.state;

        const columnsWithIcons = [{
            key: 'icons',
            style: {
                paddingLeft: 8,
                width: 24,
            },
        }].concat(columns);

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
                        maxWidth: 1200,
                        margin: '24px auto',
                        padding: 0,
                        top: 0,
                        width: '95%',
                    }}
                >
                    <DataTables
                        columns={columnsWithIcons}
                        count={20}
                        data={this.getTableData()}
                        height={'auto'}
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
