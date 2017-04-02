/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { OrderedMap } from 'immutable';
import moment from 'moment';

/* Internal dependencies */
import { getAllLeads } from 'state/entities/leads/actions';
import { Lead } from 'state/entities/models';
import tableColumns from './table-columns';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import ProgressIndicator from 'components/progress-indicator';
import SearchableTable from 'components/searchable-table';

/* Types */
import type { Map } from 'immutable';
import type { Sort } from 'components/searchable-table';

type DefaultProps = {
    getAllLeads: () => Promise<*>,
};

type Props = {
    leads: Map<number, Lead>,
    getAllLeads: () => Promise<*>,
};

type State = {
    isLoading: boolean,
    leads: Map<number, Lead>,
};

const mapStateToProps = state => ({
    leads: state.getIn(['entities', 'leads', 'byId']),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    getAllLeads: () => dispatch(getAllLeads()),
});

export class LeadsList extends React.Component<DefaultProps, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        getAllLeads: () => Promise.resolve(),
    };

    constructor(): void {
        super();
        this.state = {
            isLoading: true,
            leads: OrderedMap(),
        };
    }

    componentDidMount(): void {
        const getAllLeadsFn: Function = this.props.getAllLeads;
        if (getAllLeadsFn) {
            getAllLeadsFn().then(() => {
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
        const filterSelections = [];

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
