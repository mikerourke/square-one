/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Map } from 'immutable';
import moment from 'moment';

/* Internal dependencies */
import { getAllLeads } from 'state/entities/leads/actions';
import Lead from 'state/entities/leads/model';
import tableColumns from './table-columns';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import ProgressIndicator from 'components/progress-indicator';
import SearchableTable from 'components/searchable-table';

/* Types */
import type { Sort } from 'components/searchable-table';

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

    /**
     * Redirects the user to the Manage Lead page with empty fields for
     *      creating a new Lead.
     * @param {Event} event Event associated with the Add button.
     */
    handleAddTouchTap = (event: Event): void => {
        event.preventDefault();
        browserHistory.push('leads/new');
    };

    /**
     * Redirects the user to the Manage Lead page with the fields populated
     *      with properties from the selected Lead.
     * @param {Event} event Event associated with the Edit button.
     * @param {Object} row Row element associated with the row on which the
     *      Edit button is located.
     */
    handleEditTouchTap = (event: Event, row: Object): void => {
        event.preventDefault();
        browserHistory.push(`leads/${row.id}`);
    };

    render(): React.Element<*> {
        const { isLoading, leads } = this.state;

        // TODO: Add filter selection handling and saving.
        const filterSelections = ['Test 1', 'Test 2'];

        const leadData = leads
            .toList()
            .sortBy(lead => lead.createdAt)
            .reverse()
            .map(lead => lead.set('createdAt', moment(lead.createdAt,
                'YYYY-MM-DD HH:mm:ss.SSS Z').format('MM/DD/YY')),
            );

        const initialSort: Sort = {
            column: 'createdAt',
            order: 'desc',
        };

        const searchFields = ['leadName', 'description'];

        if (isLoading) {
            return (<ProgressIndicator />);
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
                    data={leadData}
                    filterSelections={filterSelections}
                    handleAddTouchTap={this.handleAddTouchTap}
                    handleRowIconTouchTap={this.handleEditTouchTap}
                    initialSort={initialSort}
                    searchFields={searchFields}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
