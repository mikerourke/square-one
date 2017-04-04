/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { OrderedMap } from 'immutable';
import moment from 'moment';

/* Internal dependencies */
import { selectAllLeads } from 'state/entities/leads/selectors';
import { createLead, getAllLeads } from 'state/entities/leads/actions';
import { logChanges } from 'state/entities/changes/actions';
import { Lead } from 'state/entities/models';
import tableColumns from './table-columns';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import ProgressIndicator from 'components/progress-indicator';
import SearchableTable from 'components/searchable-table';

/* Types */
import type { Map } from 'immutable';
import type { Sort } from 'components/searchable-table';

type Props = {
    leads: Map<number, Lead>,
    createLead: (lead: Lead) => Promise<*>,
    getAllLeads: () => Promise<*>,
    logChanges: (lead: Lead, changes: Array<Object>) => Promise<*>,
};

type State = {
    isLoading: boolean,
    leads: Map<number, Lead>,
};

const mapStateToProps = state => ({
    leads: selectAllLeads(state),
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    createLead: lead => dispatch(createLead(lead)),
    getAllLeads: () => dispatch(getAllLeads()),
    logChanges: (lead, changes) => dispatch(logChanges(lead, changes)),
});

/**
 * Sortable and searchable list of Leads connected to global state.
 * @export
 * @class LeadsList
 */
export class LeadsList extends Component<*, Props, State> {
    props: Props;
    state: State;

    constructor(): void {
        super();
        this.state = {
            isLoading: true,
            leads: OrderedMap(),
        };
    }

    componentDidMount(): void {
        const getAllLeadsFn = this.props.getAllLeads;
        getAllLeadsFn().then(() => {
            const leads = this.props.leads;
            this.setState({
                isLoading: false,
                leads,
            });
        });
    }

    /**
     * Redirects the user to the Manage Lead page with empty fields for
     *      creating a new Lead.
     */
    handleAddTouchTap = (): void => {
        const createLeadFn = this.props.createLead;
        const newLead = new Lead();
        createLeadFn(newLead).then(() => {
            const newLeadFromState = this.props.leads.last();
            const idOfNewLead = newLeadFromState.get('id');
            browserHistory.push(`leads/${idOfNewLead}`);
        });
    };

    /**
     * Redirects the user to the Manage Lead page with the fields populated
     *      with properties from the selected Lead.
     * @param {Object} row Row element associated with the row on which the
     *      Edit button is located.
     */
    handleEditTouchTap = (row: Object): void => {
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
                    searchFields={['leadName', 'description']}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
