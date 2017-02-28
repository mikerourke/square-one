/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
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

export class LeadsList extends React.Component {
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

    constructor(): void {
        super();

        this.state = {
            isLoading: true,
            leadsArray: [],
        };
    }

    componentDidMount(): void {
        const { populateLeads }: { populateLeads: Function} = this.props;
        if (populateLeads) {
            populateLeads().then(() => {
                const leads = this.props.leads;
                const startingData: Array<any> = Object.values(leads.toJS());
                const result = startingData.map((item: any) => ({
                    id: item.id,
                    leadName: item.leadName,
                    description: item.description,
                    status: item.status,
                }: LeadItem));
                this.setState({
                    isLoading: false,
                    leadsArray: result,
                });
            });
        }
    }

    handleEditTouchTap = (event: Event, row: Object): void => {
        event.preventDefault();
        browserHistory.push(`leads/${row.id}`);
    };

    getSelections() {
        return [
            { id: 1, value: 'Test1' },
            { id: 2, value: 'Test2' },
        ];
    }

    render(): React.Element<*> {
        const { isLoading, leadsArray } = this.state;

        const headerButton: React.Element<*> = (
            <Link to="/leads/new">
                <RaisedButton label="Add" />
            </Link>
        );

        const headerTitle: React.Element<*> = (
            <PageHeaderTitle
                headerText="Leads"
                titleIconName="people_outline"
            />
        );

        // TODO: Add filter selection handling and saving.
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
                    handleEditTouchTap={this.handleEditTouchTap}
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
