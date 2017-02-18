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
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import Table from 'components/table';

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
        this.handleCellClick = this.handleCellClick.bind(this);
        this.getTableData();
    }

    state = {
        isLoading: true,
        leadsArray: [],
    };

    getFilterSelections() {
        return [
            { id: 1, value: 'Test1' },
            { id: 2, value: 'Test2' },
        ];
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
            });
        });
    }

    handleCellClick(rowIndex, columnIndex, row, column) {
        const { push } = this.context.router;
        push(`leads/${row.id}`);
    }

    render() {
        const { isLoading, leadsArray } = this.state;
        const headerButtons = (
            <Link to="/leads/new">
                <RaisedButton label="Add New Lead" />
            </Link>
        );

        const headerTitle = (
            <PageHeaderTitle
                headerText="Leads"
                titleIconName="account_circle"
            />
        );

        const filterSelections = this.getFilterSelections();

        if (this.state.isLoading) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <PageHeader
                    elementButtonsRight={headerButtons}
                    elementTitleLeft={headerTitle}
                />
                <Table
                    columns={tableColumns}
                    data={this.state.leadsArray}
                    filterSelections={filterSelections}
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
