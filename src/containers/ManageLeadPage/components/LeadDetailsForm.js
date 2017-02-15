/*
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

/*
 * Internal dependencies
 */
import { Lead } from 'modules/leads';
import { Setting } from 'modules/settings';
import FormColumn from 'components/forms/form-column';
import FormColumnsContainer from 'components/forms/form-columns-container';
import FormGeolocation from 'components/forms/form-geolocation';

class LeadDetailsForm extends Component {
    static propTypes = {
        handleFieldChange: PropTypes.func.isRequired,
        lead: ImmutablePropTypes.record,
        representativesList: PropTypes.array.isRequired,
        sourcesList: PropTypes.array.isRequired,
    };

    static defaultProps = {
        lead: new Lead(),
        sourcesList: [],
        representativesList: [],
    };

    componentDidMount() {
        const node = document.getElementById('geo-address');
        const addEvent = node.addEventListener || node.attachEvent;
        addEvent('keypress', (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });
    }

    render() {
        const {
            handleFieldChange,
            representativesList,
            sourcesList,
            lead,
        } = this.props;

        return (
            <form id="lead-details-form">
                <FormColumnsContainer>
                    <FormColumn columnIndex={0}>
                        <TextField
                            floatingLabelText="Lead Name"
                            fullWidth={true}
                            name="leadName"
                            onChange={handleFieldChange}
                            value={lead.leadName}
                        />
                        <SelectField
                            floatingLabelText="Source"
                            fullWidth={true}
                            onChange={(event, key, payload) => {
                                handleFieldChange(event, payload, 'source');
                            }}
                            value={lead.source}
                        >
                            {sourcesList.map(selection => (
                                <MenuItem
                                    key={selection.id}
                                    primaryText={selection.value}
                                    value={selection.value}
                                />
                            ))}
                        </SelectField>
                        <TextField
                            floatingLabelText="Lead Fee"
                            fullWidth={true}
                            name="leadFee"
                            onChange={handleFieldChange}
                            value={lead.leadFee === 0 ? '' : lead.leadFee}
                        />
                        <TextField
                            floatingLabelText="Phone"
                            fullWidth={true}
                            name="phone"
                            onChange={handleFieldChange}
                            value={lead.phone}
                        />
                        <TextField
                            floatingLabelText="Email"
                            fullWidth={true}
                            name="email"
                            onChange={handleFieldChange}
                            value={lead.email}
                        />
                        <TextField
                            floatingLabelText="Description"
                            fullWidth={true}
                            name="description"
                            onChange={handleFieldChange}
                            value={lead.description}
                        />
                        <SelectField
                            floatingLabelText="Assign To"
                            fullWidth={true}
                            onChange={(event, key, payload) => {
                                handleFieldChange(event, payload, 'assignTo');
                            }}
                            value={lead.assignTo}
                        >
                            {representativesList.map(selection => (
                                <MenuItem
                                    key={selection.id}
                                    primaryText={selection.value}
                                    value={selection.value}
                                />
                            ))}
                        </SelectField>
                    </FormColumn>
                    <FormColumn columnIndex={1}>
                        <FormGeolocation
                            floatingLabelText="Address"
                            name="address"
                            onChange={handleFieldChange}
                            value={lead.address}
                        />
                    </FormColumn>
                </FormColumnsContainer>
            </form>
        );
    }
}

export default LeadDetailsForm;

