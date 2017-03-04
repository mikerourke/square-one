/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { Map } from 'immutable';
import RaisedButton from 'material-ui/RaisedButton';

/* Internal dependencies */
import { getAllLeads } from 'state/entities/leads/actions';
import { Lead } from 'state/entities/leads/model';
import tableColumns from './table-columns';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import Table from 'components/table';

const mapStateToProps = state => ({
    leads: state.getIn(['entities', 'leads', 'entities', 'leads']),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    populateLeads: () => dispatch(getAllLeads()),
});

export class LeadsList extends React.Component {
    props: {
        leads: Map<number, Lead>,
        populateLeads: () => void,
    };

    state: {
        isLoading: boolean,
        leads: Map<number, Lead>,
    };

    static defaultProps = {
        populateLeads: () => {},
    };

    constructor(): void {
        super();

        this.state = {
            isLoading: true,
            leads: new Map(),
        };
    }

    componentDidMount(): void {
        const { populateLeads }: { populateLeads: Function} = this.props;
        if (populateLeads) {
            populateLeads().then(() => {
                const leads = this.props.leads;
                this.setState({
                    isLoading: false,
                    leads,
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
        const { isLoading, leads } = this.state;

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
                    data={leads}
                    filterSelections={filterSelections}
                    handleEditTouchTap={this.handleEditTouchTap}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
