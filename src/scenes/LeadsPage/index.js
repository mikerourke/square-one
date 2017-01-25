import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Map } from 'immutable';
import MaterialButton from 'components/MaterialButton';
import DataTables from 'material-ui-datatables';

const tableColumns = [
    {
        key: 'id',
        style: {
            width: '0px',
            fontSize: '0px',
        },
    },
    {
        key: 'leadName',
        label: 'Lead Name',
        sortable: true,
    },
    {
        key: 'description',
        label: 'Description',
        sortable: false,
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
    },
];

class LeadsPage extends Component {
    static propTypes = {
        leads: PropTypes.instanceOf(Map).isRequired,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);

        // The data needs to be an array in order to populate the data table:
        this.leadsInList = Object.values(this.props.leads.toJS());
        this.state = {
            data: this.leadsInList,
            page: 1,
            rowSize: 10,
        };

        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.handleRowSizeChange = this.handleRowSizeChange.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
    }

    handleFilterValueChange(value) {
        const rows = this.state.data;
        let filteredList = [];
        if (!value || value === '') {
            filteredList = this.leadsInList;
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

    handleCellClick(rowIndex, columnIndex, row, column) {
        this.context.router.push(`leads/${row.id}`);
    }

    handleRowSizeChange(index, value) {
        // TODO: Ensure this doesn't cause issues with page count.
        this.setState({
            rowSize: value,
        });
    }

    handlePreviousPageClick() {
        // TODO: Add function to handle going to the previous page.
        // Note: This will need to accommodate for the row count displayed.
        const currentPage = this.state.page;
        const previousPage = (currentPage === 1) ? 1 : currentPage - 1;
        this.setState({
            // data: previousRows,
            page: previousPage,
        });
    }

    handleNextPageClick() {
        // TODO: Add functionality to handle going to the next page.
        // Note: This will need to accommodate for the row count displayed.
        const nextPage = this.state.page + 1;
        this.setState({
            // data: nextRows,
            page: nextPage,
        });
    }

    render() {
        return (
            <div>
                <DataTables
                    title={'Leads'}
                    height={'auto'}
                    selectable={false}
                    showRowHover={true}
                    columns={tableColumns}
                    data={this.state.data}
                    showCheckboxes={false}
                    showHeaderToolbar={true}
                    onCellClick={this.handleCellClick}
                    onFilterValueChange={this.handleFilterValueChange}
                    onSortOrderChange={this.handleSortOrderChange}
                    onNextPageClick={this.handleNextPageClick}
                    onPreviousPageClick={this.handlePreviousPageClick}
                    onRowSizeChange={this.handleRowSizeChange}
                    rowSize={this.state.rowSize}
                    page={this.state.page}
                    count={this.state.rowSize}
                    toolbarIconRight={[
                        <Link to={'/leads/add'}>
                            <MaterialButton iconName="add_circle_outline" />
                        </Link>,
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads,
});

export default connect(mapStateToProps)(LeadsPage);
