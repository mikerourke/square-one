import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Table from 'components/Table';

const tableColumns = [
    {
        accessor: 'id',
        show: false,
    },
    {
        accessor: 'leadName',
        header: 'Lead Name',
    },
    {
        accessor: 'description',
        header: 'Description',
        sortable: false,
    },
    {
        accessor: 'status',
        header: 'Status',
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

    handleCellClick(row, event) {
        this.context.router.push(`leads/${row.id}`);
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
