/* @flow */

// TODO: Add formatting for phone number.

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { preventSubmissionOnEnter } from 'lib/form-events';
import { Lead } from 'state/entities/models';
import FormColumn from 'components/forms/form-column';
import FormColumnsContainer from 'components/forms/form-columns-container';
import FormGeolocation from 'components/forms/form-geolocation';
import FormTextField from 'components/forms/form-text-field';

/* Types */
import type { MapLocation } from 'lib/types';

const mapStateToProps = (state) => {
    const settings = state.getIn(['settings', 'byName']);
    return {
        leadStatusesList: settings.get('leadStatuses').getData(),
        representativesList: settings.get('representatives').getData(),
        sourcesList: settings.get('sources').getData(),
    };
};

const ButtonContainer = styled.div`
    margin-top: 28px;
    width: 100%;
`;

/**
 * Form component for entering Lead details.
 * @param {Object} lead Lead entity associated with the form.
 */
class LeadDetailsForm extends React.Component {
    props: {
        handleDeleteTouchTap: (event: Event) => void,
        handleFieldChange: (lead: Lead) => void,
        handleSaveTouchTap: (event: Event, lead: Lead) => void,
        lead: Lead,
        leadStatusesList: Array<string>,
        representativesList: Array<string>,
        sourcesList: Array<string>,
    };

    state: {
        lead: Lead,
    };

    static defaultProps = {
        leadStatusesList: [],
        representativesList: [],
        sourcesList: [],
    };

    constructor(props: any) {
        super(props);
        this.state = {
            lead: this.props.lead,
        };
    }

    componentDidMount(): void {
        // Ensure the form submission event isn't fired if the user presses
        // "Enter" after changinging the address.
        preventSubmissionOnEnter('geo-address');
    }

    /**
     * Updates the Lead held in local state with the data from the field on the
     *      Details Form component.
     * @param {Event} event Event associated with the input.
     * @param {string} newValue New value of the input.
     * @param {string} fieldName Name of the field associated with the input.
     */
    handleInputChange = (
        event: Event, newValue: string, fieldName?: string = ''): void => {
        const { handleFieldChange } = this.props;
        let nameOfField = fieldName;

        // This is done to pass Flow type checking.
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            nameOfField = target.name;
        }

        // Update the Lead held in local state (Immutable Record).
        const { lead } = this.state;
        const updatedLead = lead.set(nameOfField, newValue);
        this.setState({ lead: updatedLead });
        handleFieldChange(updatedLead);
    };

    /**
     * Updates the address, latitude, and longitude of the Lead held in local
     *      state when the Places Autocomplete input is changed on the
     *      Details Form.
     * @param {MapLocation} newLocation New location to apply to the Lead.
     */
    handleLocationChange = (newLocation: MapLocation): void => {
        const { lead } = this.state;
        const { address, lat, lng } = newLocation;
        const updatedLead = lead.merge({ address, lat, lng });
        this.setState({ lead: updatedLead });
    };

    getItemsForSelectField =
        (selections: Array<string>): Array<React.Element<*>> =>
            selections.map(selection => (
                <MenuItem
                    key={selection}
                    primaryText={selection}
                    value={selection}
                />
            ));

    render(): React.Element<*> {
        const {
            handleDeleteTouchTap,
            handleSaveTouchTap,
            leadStatusesList,
            representativesList,
            sourcesList,
        } = this.props;

        const { lead } = this.state;

        return (
            <form id="lead-details-form">
                <FormColumnsContainer>
                    <FormColumn>
                        <FormTextField
                            floatingLabelText="Lead Name"
                            dataType="text"
                            fullWidth={true}
                            isRequired={true}
                            name="leadName"
                            onValidInputChange={this.handleInputChange}
                            value={lead.leadName}
                        />
                        <SelectField
                            floatingLabelText="Source"
                            fullWidth={true}
                            onChange={
                                (event: Event, key: string, value: string) => {
                                    this.handleInputChange(
                                        event, value, 'source');
                                }}
                            value={lead.source}
                        >
                            {this.getItemsForSelectField(sourcesList)}
                        </SelectField>
                        <FormTextField
                            floatingLabelText="Lead Fee"
                            dataType="number"
                            fullWidth={true}
                            name="leadFee"
                            onValidInputChange={this.handleInputChange}
                            value={lead.leadFee === 0 ? '' : lead.leadFee}
                        />
                        <FormTextField
                            floatingLabelText="Phone"
                            format="phone"
                            fullWidth={true}
                            isRequired={true}
                            name="phone"
                            onValidInputChange={this.handleInputChange}
                            type="tel"
                            pattern="^\d{3}-\d{3}-\d{4}$"
                            value={lead.phone}
                        />
                        <TextField
                            floatingLabelText="Email"
                            fullWidth={true}
                            name="email"
                            onChange={this.handleInputChange}
                            value={lead.email}
                        />
                        <TextField
                            floatingLabelText="Description"
                            fullWidth={true}
                            name="description"
                            onChange={this.handleInputChange}
                            value={lead.description}
                        />
                        <SelectField
                            floatingLabelText="Assign To"
                            fullWidth={true}
                            onChange={
                                (event: Event, key: string, value: string) => {
                                    this.handleInputChange(
                                        event, value, 'assignTo');
                                }}
                            value={lead.assignTo}
                        >
                            {this.getItemsForSelectField(representativesList)}
                        </SelectField>
                    </FormColumn>
                    <FormColumn>
                        <SelectField
                            floatingLabelText="Status"
                            fullWidth={true}
                            onChange={
                                (event: Event, key: string, value: string) => {
                                    this.handleInputChange(
                                        event, value, 'status');
                                }}
                            value={lead.status}
                        >
                            {this.getItemsForSelectField(leadStatusesList)}
                        </SelectField>
                        <FormGeolocation
                            floatingLabelText="Address"
                            handleLocationChange={this.handleLocationChange}
                            startingLocation={{
                                address: lead.address,
                                lat: lead.lat,
                                lng: lead.lng,
                            }}
                        />
                    </FormColumn>
                </FormColumnsContainer>
                <ButtonContainer>
                    <RaisedButton
                        label="Save"
                        onTouchTap={(event: Event) =>
                            handleSaveTouchTap(event, lead)}
                        primary={true}
                    />
                    <RaisedButton
                        label="Delete"
                        onTouchTap={handleDeleteTouchTap}
                        secondary={true}
                        style={{ marginLeft: 16 }}
                    />
                </ButtonContainer>
            </form>
        );
    }
}

export default connect(mapStateToProps)(LeadDetailsForm);
