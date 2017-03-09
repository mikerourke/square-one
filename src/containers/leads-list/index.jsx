/* @flow */

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Map } from 'immutable';
import IconButton from 'material-ui/IconButton';

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

    handleAddTouchTap = (event: Event): void => {
        event.preventDefault();
        browserHistory.push('leads/new');
    };

    handleEditTouchTap = (event: Event, row: Object): void => {
        event.preventDefault();
        browserHistory.push(`leads/${row.id}`);
    };

    getTableData = (): List<*> => {
        const { leads } = this.state;
        return leads.map(lead => lead.set('editIcon', (
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color: primary1Color }}
                onTouchTap={(event: Event) =>
                    this.handleEditTouchTap(event, lead)}
                tooltip="Edit this lead"
                tooltipPosition="bottom-right"
                tooltipStyles={{ fontSize: 12 }}
            >
                mode_edit
            </IconButton>
        ))).toList();
    };

    render(): React.Element<*> {
        const { isLoading } = this.state;

        // TODO: Add filter selection handling and saving.
        const filterSelections = ['Test 1', 'Test 2'];

        if (isLoading) {
            return (<div>Loading...</div>);
        }
        const tableData = this.getTableData().toList();
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
                    data={tableData}
                    filterSelections={filterSelections}
                    handleAddTouchTap={this.handleAddTouchTap}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadsList);
