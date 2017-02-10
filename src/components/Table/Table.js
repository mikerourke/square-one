import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';
import Paper from 'components/Paper';
import TableHeader from './TableHeader';
import './styles.css';

const StyledPaper = styled(Paper)`
    padding: 0;
`;

class Table extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        handleCellClick: PropTypes.func.isRequired,
    };

    render() {
        const { title, columns, data, handleCellClick } = this.props;

        return (
            <div>
                <StyledPaper>
                    <TableHeader title={title} />
                    <ReactTable
                        className="-striped -highlight"
                        columns={columns}
                        data={data}
                        defaultPageSize={15}
                        pageSize={10}
                        getTrProps={(state, rowInfo, column) => ({
                            onClick: event => handleCellClick(event, rowInfo),
                        })}
                    />
                </StyledPaper>
            </div>
        );
    }
}

export default Table;
