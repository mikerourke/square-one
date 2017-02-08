import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import ReactTable from 'react-table';
import TableHeader from './TableHeader';
import globalStyles from 'scenes/styles';
import 'react-table/react-table.css';
import './styles.css';

const styles = Object.assign({}, globalStyles, {
    paper: Object.assign({}, globalStyles.paper, {
        padding: 0,
    }),
});

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
                <Paper style={styles.paper}>
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
                </Paper>
            </div>
        );
    }
}

export default Table;
