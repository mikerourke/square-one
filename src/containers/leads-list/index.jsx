// @flow
/* External dependencies */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

/* Internal dependencies */
import { getAllLeads } from 'state/leads/actions';
import { Lead } from 'state/leads';
import tableColumns from './table-columns';
import PageHeader from 'components/page-header';
import PageHeaderTitle from 'components/page-header-title';
import Table from 'components/table';

type Props = {
    leads: Object,
    populateLeads: () => void,
};

type State = {
    isLoading: boolean,
    leadsArray: Array<Object>,
}

class LeadsList extends Component {
    handleCellClick: () => void;

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props: Props, context: any) {
        super(props, context);
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    state: State = {
        isLoading: true,
        leadsArray: [],
    };

    componentDidMount() {
        this.props.populateLeads().then(() => {
            const startingData = Object.values(this.props.leads.toJS());
            const result = startingData.map((item: Lead) => {
                const leadItem: {
                    id: number,
                    leadName: string,
                    description: string,
                    status: string
                } = {
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

    handleCellClick(
        rowIndex: number,
        columnIndex: number,
        row: Object,
        column: Object,
    ) {
        this.context.router.push(`leads/${row.id}`);
    }

    getFilterSelections() {
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

        const filterSelections = this.getFilterSelections();

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
