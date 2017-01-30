import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import HeaderToolbar from './HeaderToolbar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './styles.css';

class Table extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        handleCellClick: PropTypes.func.isRequired,
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };

    getStyles() {
        const { palette } = this.context.muiTheme.baseTheme;

        // This style applies to multiple element styles:
        const commonStyle = {
            borderRight: 'none',
            boxShadow: 'none',
            fontFamily: 'Roboto',
            fontSize: '13px',
            textAlign: 'left',
        };

        const headerStyle = {
            color: palette.accent3Color,
            fontWeight: 'bold',
        };

        return {
            style: {
                border: 'none',
            },
            theadStyle: Object.assign({}, commonStyle, headerStyle, {
                borderBottom: `1px solid ${palette.accent2Color}`,
            }),
            trStyle: Object.assign({}, commonStyle, {
                height: '42px',
            }),
            thStyle: Object.assign({}, commonStyle, headerStyle, {
                padding: '18px 0 0 24px',
            }),
            tdStyle: Object.assign({}, commonStyle, {
                padding: '14px 24px',
            }),
        };
    }

    render() {
        const localStyles = this.getStyles();
        const { title, columns, data, handleCellClick } = this.props;

        return (
            <div>
                <HeaderToolbar title={title} />
                <ReactTable
                    columns={columns}
                    data={data}
                    pageSize={15}
                    onTrClick={handleCellClick}
                    className="-striped -highlight"
                    style={localStyles.style}
                    theadStyle={localStyles.theadStyle}
                    trStyle={localStyles.trStyle}
                    thStyle={localStyles.thStyle}
                    tdStyle={localStyles.tdStyle}
                />
            </div>
        );
    }
}

export default Table;
