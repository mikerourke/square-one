import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { getAllLeads } from 'data/leads/actions';
import LeadsTable from './components/LeadsTable';
import PageHeaderToolbar from './components/PageHeaderToolbar';

class LeadsPage extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        leads: ImmutablePropTypes.orderedMap.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);
        this.props.actions.getAllLeads();
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    handleCellClick(rowIndex, columnIndex, row, column) {
        const { push } = this.context.router;
        push(`leads/${row.id}`);
    }

    render() {
        if (this.props.leads.size === 0) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <PageHeaderToolbar />
                <LeadsTable
                    leads={this.props.leads}
                    handleCellClick={this.handleCellClick}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ getAllLeads }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadsPage);
