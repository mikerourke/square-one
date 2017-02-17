/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import DataTables from 'material-ui-datatables';
import Paper from 'material-ui/Paper';

/*
 * Internal dependencies
 */
import { inline } from 'style/mui';

/**
 * Table with pagination, sorting, and filtering capabilities.
 */
class Table extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        handleCellClick: PropTypes.func.isRequired,
        handlePageChange: PropTypes.func.isRequired,
        handleRowSizeChange: PropTypes.func.isRequired,
        handleSortOrderChange: PropTypes.func.isRequired,
        page: PropTypes.number,
        rowSize: PropTypes.number,
    };

    static defaultProps = {
        page: 1,
        rowSize: 10,
    };

    constructor(props, context) {
        super(props, context);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    }

    handleNextPageClick() {
        const { handlePageChange } = this.props;
        handlePageChange('next');
    }

    handlePreviousPageClick() {
        const { handlePageChange } = this.props;
        handlePageChange('previous');
    }

    render() {
        const {
            handleCellClick,
            handlePageChange,
            handleRowSizeChange,
            handleSortOrderChange,
            ...props,
        } = this.props;
        return (
            <Paper
                style={{
                    ...inline.paper,
                    top: '-58px',
                    padding: 0,
                }}
            >
                <DataTables
                    count={20}
                    height={'auto'}
                    onCellClick={handleCellClick}
                    onNextPageClick={this.handleNextPageClick}
                    onPreviousPageClick={this.handlePreviousPageClick}
                    onRowSizeChange={handleRowSizeChange}
                    onSortOrderChange={handleSortOrderChange}
                    selectable={false}
                    showCheckboxes={false}
                    showHeaderToolbar={false}
                    showRowHover={true}
                    {...props}
                />
            </Paper>
        );
    }
}

export default Table;
