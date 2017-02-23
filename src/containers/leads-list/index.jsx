// @flow

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

/* Internal dependencies */
import { getAllLeads } from 'state/leads/actions';
import tableColumns from './table-columns';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import Table from 'components/table';

type LeadItem = {
    id: number,
    leadName: string,
    description: string,
    status: string,
};

class LeadsList extends React.Component {
    props: {
        leads: Object,
        populateLeads: () => void,
    };

    state: {
        isLoading: boolean,
        leadsArray: Array<Object>,
    };

    static defaultProps = {
        populateLeads: () => {},
    };

    constructor() {
        super();

        this.state = {
            isLoading: true,
            leadsArray: [],
        };

        (this: any).handleCellClick = this.handleCellClick.bind(this);
    }

    componentDidMount() {
        const populateLeadsFn: Function = this.props.populateLeads;
        if (populateLeadsFn) {
            populateLeadsFn().then(() => {
                const leads = this.props.leads;
                const startingData: Array<any> = Object.values(leads.toJS());
                const result = startingData.map((item: any) => {
                    const leadItem: LeadItem = {
                        id: item.id,
                        leadName: item.leadName,
                        description: item.description,
                        status: item.status,
                    };
                    return leadItem;
                });
                this.setState({
                    isLoading: false,
                    leadsArray: result,
                });
            });
        }
    }

    handleCellClick(rowIndex: number, columnIndex: number,
                    row: Object, column: Object) {
        browserHistory.push(`leads/${row.id}`);
    }

    getSelections() {
        return [
            { id: 1, value: 'Test1' },
            { id: 2, value: 'Test2' },
        ];
    }

    render() {
        const { isLoading, leadsArray } = this.state;

        const headerButton: React.Element<*> = (
            <Link to="/leads/new">
                <RaisedButton
                    icon={
                        <FontIcon className="material-icons">
                            add_circle_outline
                        </FontIcon>
                    }
                    label="Add"
                />
            </Link>
        );

        const headerTitle: React.Element<*> = (
            <PageHeaderTitle
                headerText="Leads"
                titleIconName="account_circle"
            />
        );

        const filterSelections = this.getSelections();

        if (isLoading) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <PageHeader
                    actionButtonRight={headerButton}
                    titleLeft={headerTitle}
                />
                <Table
                    columns={tableColumns}
                    data={leadsArray}
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
    dispatch,
    populateLeads: () => dispatch(getAllLeads()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
