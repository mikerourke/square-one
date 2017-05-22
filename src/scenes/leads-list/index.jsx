/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { OrderedMap } from 'immutable';

/* Internal dependencies */
import { selectAllLeads } from 'state/entities/leads/selectors';
import { createLead, getAllLeads } from 'state/entities/leads/actions';
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
};

type State = {
  isLoading: boolean,
};

const mapStateToProps = state => ({
  leads: selectAllLeads(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  createLead: lead => dispatch(createLead(lead)),
  getAllLeads: () => dispatch(getAllLeads()),
});

/**
 * Sortable and searchable list of Leads connected to global state.
 * @export
 * @class LeadsList
 */
export class LeadsList extends Component<*, Props, State> {
  props: Props;
  state: State;

  constructor(props: Props): void {
    super(props);
    this.state = {
      isLoading: false,
      leads: OrderedMap(),
    };
  }

  /**
   * Redirects the user to the Manage Lead page with empty fields for
   *    creating a new Lead.
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
   *    with properties from the selected Lead.
   * @param {Object} row Row element associated with the row on which the
   *    Edit button is located.
   */
  handleEditTouchTap = (row: Object): void => {
    browserHistory.push(`leads/${row.id}`);
  };

  render(): React.Element<*> {
    const { leads } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (<ProgressIndicator />);
    }

    // FUTURE: Add filter selection handling and saving.
    const filterSelections = [];

    const leadData = leads
      .toList()
      .sortBy(lead => lead.createdAt)
      .reverse();

    const initialSort: Sort = {
      column: 'createdAt',
      order: 'desc',
    };

    // FUTURE: Fix column formatting for small devices.
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
