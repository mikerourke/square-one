/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { toJS } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';

/*
 * Internal dependencies
 */
import { Lead, actions as leadActions } from 'modules/leads';
import { Setting, actions as settingsActions } from 'modules/settings';
import LeadDetailsForm from './components/LeadDetailsForm';
import MessagesModal from './components/MessagesModal';
import PageHeaderToolbar from './components/PageHeaderToolbar';
import TabsContainer from './components/TabsContainer';
import HistoryTab from './components/HistoryTab';
import { inline } from 'style/mui';

class ManageLeadPage extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        lead: ImmutablePropTypes.record,
        representativesList: PropTypes.array.isRequired,
        sourcesList: PropTypes.array.isRequired,
    };

    static defaultProps = {
        lead: new Lead(),
    };

    constructor(props, context) {
        super(props, context);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleModalTouchTap = this.handleModalTouchTap.bind(this);
        this.handleSaveTouchTap = this.handleSaveTouchTap.bind(this);
        this.handleBackTouchTap = this.handleBackTouchTap.bind(this);
    }

    state = {
        isModalOpen: false,
        leadOnPage: this.props.lead,
    };

    handleFieldChange(event, newValue, fieldName = '') {
        const { leadOnPage } = this.state;
        const nameOfField = (fieldName === '') ? event.target.name : fieldName;
        const updatedLead = leadOnPage.set(nameOfField, newValue);
        return this.setState({
            leadOnPage: updatedLead,
        });
    }

    handleModalTouchTap(event) {
        event.preventDefault();
        this.setState({ isModalOpen: false });
        const { createLead, updateLead } = this.props.actions;
        const { push } = this.context.router;
        const { leadOnPage } = this.state;
        const leadEntity = leadOnPage.toJS();
        const performAction = leadEntity.id === 0 ?
                              createLead :
                              updateLead;
        performAction(leadEntity).then(() => {
            push('/leads');
        });
    }

    handleBackTouchTap(event) {
        event.preventDefault();
        browserHistory.push('/leads');
    }

    handleSaveTouchTap(event) {
        event.preventDefault();
        this.setState({ isModalOpen: true });
    }

    render() {
        const {
            lead,
            representativesList,
            sourcesList,
        } = this.props;

        const { isModalOpen, leadOnPage } = this.state;
        return (
            <div>
                <PageHeaderToolbar
                    handleBackTouchTap={this.handleBackTouchTap}
                    handleSaveTouchTap={this.handleSaveTouchTap}
                    lead={lead}
                />
                <TabsContainer>
                    <Tabs
                        style={inline.tabs}
                        tabItemContainerStyle={{ width: 512 }}
                    >
                        <Tab
                            label="Details"
                            style={inline.tab}
                        >
                            <Paper
                                style={{
                                    margin: '24px 0',
                                    padding: 24,
                                }}
                            >
                                <LeadDetailsForm
                                    handleFieldChange={this.handleFieldChange}
                                    representativesList={representativesList}
                                    sourcesList={sourcesList}
                                    lead={leadOnPage}
                                />
                            </Paper>
                        </Tab>
                        <Tab
                            label="History"
                            style={inline.tab}
                        >
                            <Paper
                                style={{
                                    margin: '24px 0',
                                    padding: 24,
                                }}
                            >
                                <HistoryTab />
                            </Paper>
                        </Tab>
                        <Tab
                            label="Appointments"
                            style={inline.tab}
                        >
                            <Paper
                                style={{
                                    margin: '24px 0',
                                    padding: 24,
                                }}
                            >
                                Appointments
                            </Paper>
                        </Tab>
                        <Tab
                            label="Messages"
                            style={inline.tab}
                        >
                            <Paper
                                style={{
                                    margin: '24px 0',
                                    padding: 24,
                                }}
                            >
                                Messages
                            </Paper>
                        </Tab>
                    </Tabs>
                </TabsContainer>
                <MessagesModal
                    handleModalTouchTap={this.handleModalTouchTap}
                    isOpen={isModalOpen}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let leadOnPage = new Lead();
    if (ownProps.params.id) {
        const leadId = ownProps.params.id.toString();
        leadOnPage = state.leads.get(leadId);
    }
    return {
        lead: leadOnPage,
        representativesList: state.settings.get('representatives').getData(),
        sourcesList: state.settings.get('sources').getData(),
    };
};

const mapDispatchToProps = (dispatch) => {
    const combinedActions = Object.assign({}, leadActions, settingsActions);
    return {
        actions: bindActionCreators(combinedActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLeadPage);
