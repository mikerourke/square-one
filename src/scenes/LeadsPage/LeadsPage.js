import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Table from 'components/Table';

const tableColumns = [
    {
        key: 'id',
        show: false,
        style: {
            fontSize: 0,
            width: 0,
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
        const { push } = this.context.router;
        push(`leads/${row.id}`);
    }

    render() {
        const startingData = Object.values(this.props.leads.toJS());
        const dataForTable = startingData.map(item => ({
            id: item.id,
            leadName: item.leadName,
            description: item.description,
            status: item.status,
        }));
        return (
            <Table
                title="Leads"
                columns={tableColumns}
                data={dataForTable}
                handleCellClick={this.handleCellClick}
            />
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads,
});

export default connect(mapStateToProps)(LeadsPage);
