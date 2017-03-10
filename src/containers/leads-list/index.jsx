/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Map } from 'immutable';

/* Internal dependencies */
import { primary1Color } from 'style/mui/palette';
import { getAllLeads } from 'state/entities/leads/actions';
import Lead from 'state/entities/leads/model';
import tableColumns from './table-columns';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import SearchableTable from 'components/searchable-table';

/* Types */
import type { List } from 'immutable';

const mapStateToProps = state => ({
    leads: state.getIn(['entities', 'leads', 'entities']),
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

    handleAddTouchTap = (event: Event): void => {
        event.preventDefault();
        browserHistory.push('leads/new');
    };

    handleEditTouchTap = (event: Event, row: Object): void => {
        event.preventDefault();
        browserHistory.push(`leads/${row.id}`);
    };

    render(): React.Element<*> {
        const { isLoading, leads } = this.state;

        // TODO: Add filter selection handling and saving.
        const filterSelections = ['Test 1', 'Test 2'];

        if (isLoading) {
            return (<div>Loading...</div>);
        }
        return (
            <div>
                <PageHeader
                    titleLeft={(
                        <PageHeaderTitle
                            headerText="Leads"
                            titleIconName="people_outline"
                        />
                    )}
                />
                <SearchableTable
                    columns={tableColumns}
                    data={leads.toList()}
                    filterSelections={filterSelections}
                    handleAddTouchTap={this.handleAddTouchTap}
                    handleRowIconTouchTap={this.handleEditTouchTap}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
