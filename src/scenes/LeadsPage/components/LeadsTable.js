import React, { PropTypes } from 'react';
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

const getTableData = (leads) => {
    const startingData = Object.values(leads.toJS());
    return startingData.map(item => ({
        id: item.id,
        leadName: item.leadName,
        description: item.description,
        status: item.status,
    }));
};

const LeadsTable = ({
    leads,
    handleCellClick,
}) => (
    <Table
        title="Leads"
        columns={tableColumns}
        data={getTableData(leads)}
        handleCellClick={handleCellClick}
    />
);

LeadsTable.propTypes = {
    leads: ImmutablePropTypes.orderedMap.isRequired,
    handleCellClick: PropTypes.func.isRequired,
};

export default LeadsTable;
