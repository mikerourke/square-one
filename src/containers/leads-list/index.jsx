/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

/*
 * Internal dependencies
 */
import { getAllLeads } from 'state/leads/actions';
import tableColumns from './table-columns';
import SearchableListPage from '../templates/searchable-list-page';

class LeadsList extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        leads: ImmutablePropTypes.orderedMap.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);
        this.getTableData();
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    state = {
        isLoading: true,
        leadsArray: [],
    };

    handleCellClick(rowIndex, columnIndex, row, column) {
        const { push } = this.context.router;
        push(`leads/${row.id}`);
    }

    getFilterSelections() {
        return [
            {id: 1, value: 'Test1'},
            {id: 2, value: 'Test2'},
        ]
    }

    getTableData() {
        this.props.actions.getAllLeads().then(() => {
            const { leads } = this.props;
            console.log(leads);
            const startingData = Object.values(leads.toJS());
            const result = startingData.map(item => ({
                id: item.id,
                leadName: item.leadName,
                description: item.description,
                status: item.status,
            }));
            this.setState({
                isLoading: false,
                leadsArray: result,
            })
        })
    };

    render() {
        const { isLoading, leadsArray } = this.state;
        const headerButtons = (
            <Link to="/leads/new">
                <RaisedButton label="Add New Lead" />
            </Link>
        );

        if (isLoading) {
            return (<div>Loading...</div>);
        }

        return (
            <SearchableListPage
                elementButtonsRight={headerButtons}
                filterSelections={this.getFilterSelections()}
                handleCellClick={this.handleCellClick}
                headerText="Leads"
                titleIconName="account_circle"
                tableColumns={tableColumns}
                tableData={leadsArray}
            />
        );
    }
}

const mapStateToProps = state => ({
    leads: state.leads,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ getAllLeads }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
