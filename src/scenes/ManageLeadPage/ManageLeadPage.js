import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { toJS } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Lead, actions as leadActions } from 'data/leads';
import { Setting, actions as settingsActions } from 'data/settings';
import Paper from './components/Paper';
import LeadDetailsForm from './components/LeadDetailsForm';
import PageHeaderToolbar from './components/PageHeaderToolbar';
import TabsContainer from './components/TabsContainer';

class ManageLeadPage extends Component {
    static contextTypes = {
        router: PropTypes.object,
    };

    static propTypes = {
        lead: ImmutablePropTypes.record,
        sourcesList: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
    };

    static defaultProps = {
        lead: new Lead(),
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            lead: props.lead,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSaveTouchTap = this.handleSaveTouchTap.bind(this);
        this.handleBackTouchTap = this.handleBackTouchTap.bind(this);
    }

    handleChange(event, keyOrNewValue, payload) {
        const fieldName = payload ? 'source' : event.target.name;
        const fieldValue = payload || keyOrNewValue;
        const updatedLead = this.state.lead.set(fieldName, fieldValue);
        return this.setState({ lead: updatedLead });
    }

    handleBackTouchTap(event) {
        event.preventDefault();
        browserHistory.push('/leads');
    }

    handleSaveTouchTap(event) {
        event.preventDefault();
        const { createLead, updateLead } = this.props.actions;
        const { push } = this.context.router;
        const leadEntity = this.state.lead.toJS();
        const performAction = leadEntity.id === 0 ?
                              createLead :
                              updateLead;
        performAction(leadEntity).then(() => {
            push('/leads');
        });
    }

    render() {
        const { lead, sourcesList } = this.props;
        const styles = {
            tab: {
                textTransform: 'none',
            },
            tabItemContainer: {
                width: 384,
            },
            tabs: {
                margin: '0 auto',
                maxWidth: 1200,
            },
        };
        return (
            <div>
                <PageHeaderToolbar
                    handleBackTouchTap={this.handleBackTouchTap}
                    handleSaveTouchTap={this.handleSaveTouchTap}
                    lead={lead}
                />
                <TabsContainer>
                    <Tabs
                        style={styles.tabs}
                        tabItemContainerStyle={styles.tabItemContainer}
                    >
                        <Tab
                            label="Details"
                            style={styles.tab}
                        >
                            <Paper>
                                <LeadDetailsForm
                                    handleChange={this.handleChange}
                                    sourcesList={sourcesList}
                                    lead={this.state.lead}
                                />
                            </Paper>
                        </Tab>
                        <Tab
                            label="Appointments"
                            style={styles.tab}
                        >
                            <Paper>
                                Stuff!
                            </Paper>
                        </Tab>
                        <Tab
                            label="Messages"
                            style={styles.tab}
                        >
                            <Paper>
                                Stuff!
                            </Paper>
                        </Tab>
                    </Tabs>
                </TabsContainer>
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
