// @flow

/* External dependencies */
import React from 'react';
import DataTables from 'material-ui-datatables';
import Paper from 'material-ui/Paper';

/* Internal dependencies */
import TableToolbar from './toolbar';

type Column = {
    key: string,
    label: string,
    sortable?: boolean,
    style: Object,
};

type Props = {
    columns: Array<Column>,
    data: Array<Object>,
    filterSelections: Array<Object>,
    handleCellClick: () => void,
};

type State = {
    data: Array<Object>,
    page: number,
    rowSize: number,
};

/**
 * Table with pagination, sorting, and filtering capabilities.
 */
class Table extends React.Component<*, Props, *> {
    static defaultProps = {
        data: [],
        filterSelections: [],
    };

    constructor(props: Props, context: any) {
        super(props, context);

        this.handleFilterMenuChange = this.handleFilterMenuChange.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    }

    state: State = {
        data: this.props.data,
        page: 1,
        rowSize: 10,
    };

    handleFilterMenuChange: () => void;
    handleNextPageClick: () => void;
    handlePreviousPageClick: () => void;
    handleRowSizeChange: () => void;
    handleSearchBoxChange: () => void;
    handleSortOrderChange: () => void;

    handleFilterMenuChange(
        event: Event,
        key: string,
        payload: string,
    ) {
        // TODO: Write code to handle filter menu.
    }

    handleNextPageClick() {
        // TODO: Add functionality to handle going to the next page.
        // Note: This will need to accommodate for the row count displayed.
        const nextPage: number = this.state.page + 1;
        this.setState({
            page: nextPage,
        });
    }

    handlePreviousPageClick() {
        // TODO: Add function to handle going to the previous page.
        // Note: This will need to accommodate for the row count displayed.
        const currentPage: number = this.state.page;
        const previousPage: number = (currentPage === 1) ? 1 : currentPage - 1;
        this.setState({
            page: previousPage,
        });
    }

    handleRowSizeChange(
        index: number,
        value: number,
    ) {
        // TODO: Ensure this doesn't cause issues with page count.
        this.setState({
            rowSize: value,
        });
    }

    handleSearchBoxChange(
        event: Event,
        newValue: string,
    ) {
        const initialData: Array<Object> = this.props.data;
        const rows: Array<Object> = initialData;
        let filteredList: Array<Object> = [];
        if (!newValue || newValue === '') {
            filteredList = initialData;
        } else {
            filteredList = rows.filter((rowItem: Object) => {
                let countFound: number = 0;
                Object.keys(rowItem).forEach((key: string) => {
                    const rowValue: string = rowItem[key].toString()
                        .toLowerCase();
                    if (rowValue.includes(newValue.toLowerCase())) {
                        countFound += 1;
                    }
                });
                return (countFound > 0);
            });
        }
        this.setState({ data: filteredList });
    }

    handleSortOrderChange(
        key: string,
        order: string,
    ) {
        const { data } = this.state;
        const sortedList: Array<Object> = data.slice().sort((a, b) => {
            let sortValue: number = (a[key] > b[key]) ? 1 : -1;
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
