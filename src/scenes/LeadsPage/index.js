import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Table from 'components/Table';

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
        leads: ImmutablePropTypes.orderedMap.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);

        this.handleCellClick = this.handleCellClick.bind(this);
    }

    handleCellClick(rowIndex, columnIndex, row, column) {
        this.context.router.push(`leads/${row.id}`);
    }

    render() {
        const startingData = Object.values(this.props.leads.toJS());
        return (
            <div>
                <Table
                    title="Leads"
                    columns={tableColumns}
                    data={startingData}
                    handleCellClick={this.handleCellClick}
                    addRoute={'/leads/new'}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads,
});

export default connect(mapStateToProps)(LeadsPage);
