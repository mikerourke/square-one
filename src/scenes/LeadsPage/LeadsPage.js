import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as leadActions from 'data/leads/actions';
import { Link } from 'react-router';

import { ContentAddCircleOutline } from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import DataTables from 'material-ui-datatables';

const tableColumns = [
    {
        key: 'id',
        style: {
            width: '0px',
            fontSize: '0px',
        }
    },
    {
        key: 'firstName',
        label: 'First Name',
        sortable: true,
    },
    {
        key: 'lastName',
        label: 'Last Name',
        sortable: true,
    }
];

class LeadsPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.rows = this.props.leads;
        this.state = {
            data: this.rows,
            count: 50,
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
        const filteredList = rows.filter(rowItem => {
            let countFound = 0;
            Object.keys(rowItem).forEach(key => {
                const rowValue = rowItem[key].toString().toLowerCase();
                if (rowValue.includes(value.toLowerCase())) {
                    countFound  += 1;
                }
            });
            return (countFound > 0);
        });

        this.setState({data: value === '' ? this.rows : filteredList});
    }

    handleSortOrderChange(key, order) {
        const rows = this.state.data.slice();
        const sortedList = rows.sort((a, b) => {
            let sortValue = (a[key] > b[key]) ? 1 : -1;
            if (order === 'desc') {
                sortValue = sortValue * -1;
            }
            return sortValue;
        });

        this.setState({data: sortedList});
    }

    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(row);
    }

    handleRowSizeChange(index, value) {
        //TODO: Ensure this doesn't cause issues with page count.
        this.setState({
            rowSize: value
        });
    }

    handlePreviousPageClick() {
        //TODO: Add function to handle going to the previous page.
        // Note: This will need to accommodate for the row count being displayed.
        let currentPage = this.state.page;
        const previousPage = (currentPage === 1) ? 1 : currentPage - 1;
        this.setState({
            // data: previousRows,
            page: previousPage
        })
    }

    handleNextPageClick() {
        //TODO: Add functionality to handle going to the next page.
        // Note: This will need to accommodate for the row count being displayed.
        const nextPage = this.state.page + 1;
        this.setState({
           // data: nextRows,
           page: nextPage
        })
    }

    render() {
        const { leads, getAllLeads } = this.props;

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
                    count={this.state.count}
                    toolbarIconRight = {[
                        <IconButton>
                            <Link to={'/lead'}><ContentAddCircleOutline/></Link>
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}

LeadsPage.propTypes = {
    leads: PropTypes.array
};

const mapStateToProps = state => ({
    leads: state.leads,
});

const mapDispatchToProps = dispatch => bindActionCreators(leadActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsPage);
