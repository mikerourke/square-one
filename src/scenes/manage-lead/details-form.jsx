/* @flow */

// TODO: Add formatting for phone number.

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { preventSubmissionOnEnter } from 'lib/form-events';
import { selectListSettings } from 'state/settings/selectors';
import { Lead } from 'state/entities/models';
import FormColumn from 'components/forms/form-column';
import FormColumnsContainer from 'components/forms/form-columns-container';
import FormGeolocation from 'components/forms/form-geolocation';
import FormTextField from 'components/forms/form-text-field';

/* Types */
import type { MapLocation } from 'lib/types';

type DefaultProps = {
    listSettings: Object,
};

type Props = {
    handleDeleteTouchTap: () => void,
    handleFieldChange: (lead: Lead) => void,
    handleSaveTouchTap: (lead: Lead) => void,
    lead: Lead,
    listSettings: Object,
};

type State = {
    lead: Lead,
};

const ButtonContainer = styled.div`
    margin-top: 28px;
    margin-left: 8px;
    width: 100%;
`;

const mapStateToProps = state => ({
    listSettings: selectListSettings(state),
});

/**
 * Form component for entering Lead details.
 * @param {Lead} lead Lead entity associated with the form.
 * @export
 * @class LeadDetailsForm
 */
export class LeadDetailsForm extends Component<DefaultProps, Props, State> {
    props: Props;
    state: State;

    static defaultProps = {
        listSettings: {
            leadStatuses: [],
            representatives: [],
            sources: [],
        },
    };

    constructor(props: Props): void {
        super(props);
        this.state = {
            lead: props.lead,
        };
    }

    componentDidMount(): void {
        // Ensure the form submission event isn't fired if the user presses
        // "Enter" after changinging the address.
        preventSubmissionOnEnter('geo-address');
    }

    /**
     * Changes the value of the specified field name to the specified value.
     * @param {string} fieldName Name of the field to update.
     * @param {string|number} newValue Value of the field.
     */
    updateLeadInState = (
        fieldName: string,
        newValue: string | number,
    ): void => {
        const { handleFieldChange } = this.props;
        const { lead } = this.state;
        const updatedLead = lead.set(fieldName, newValue);
        this.setState({ lead: updatedLead });
        handleFieldChange(updatedLead);
    };

    /**
     * Updates the Lead held in local state with the data from the field on the
     *      Details Form component.
     * @param {Event} event Event associated with the input.
     * @param {string|number} newValue New value of the input.
     */
    handleInputChange = (
        // $FlowFixMe
        event: Event & { currentTarget: HTMLInputElement },
        newValue: string | number,
    ): void => {
        const fieldName = event.currentTarget.name;
        this.updateLeadInState(fieldName, newValue);
    };

    /**
     * Update the value of the corresponding Lead field in local state when
     *      the value of a select field is selected.
     * @param {string} fieldName Name of the field associated with the select
     *      field.
     * @param {string} newValue Value of the selected item.
     */
    handleSelectionChange = (
        fieldName: string,
        newValue: string,
    ): void => {
        this.updateLeadInState(fieldName, newValue);
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

    /**
     * Returns a list of MenuItem elements to populate a select field with the
     *      specified name.
     * @param {string} settingName Name of the corresponding setting to get
     *      MenuItems for.
     * @param {boolean} allowEmpty Create an empty value for the top item.
     * @return {Array} Array of MenuItem elements.
     */
    getSelections = (
        settingName: string,
        allowEmpty?: boolean = false,
    ): Array<React.Element<*>> => {
        const { listSettings } = this.props;
        const menuItems = listSettings[settingName].map(selection => (
            <MenuItem
                key={selection}
                primaryText={selection}
                value={selection}
            />
        ));
        if (allowEmpty) {
            menuItems.unshift(<MenuItem key="0" primaryText="" value="" />);
        }
        return menuItems;
    };

    render(): React.Element<*> {
        const {
            handleDeleteTouchTap,
            handleSaveTouchTap,
        } = this.props;
        const { lead } = this.state;

        return (
            <form id="lead-details-form">
                <FormColumnsContainer>
                    <FormColumn>
                        <SelectField
                            disabled={(lead.id === 0)}
                            floatingLabelText="Status"
                            fullWidth={true}
                            onChange={(event, key, value) => {
                                this.handleSelectionChange('status', value);
                            }}
                            value={lead.status}
                        >
                            {this.getSelections('leadStatuses')}
                        </SelectField>
                        <FormTextField
                            floatingLabelText="Lead Name"
                            dataType="text"
                            fullWidth={true}
                            isRequired={true}
                            name="leadName"
                            onValidInputChange={this.handleInputChange}
                            value={lead.leadName}
                        />
                        <TextField
                            floatingLabelFixed={true}
                            floatingLabelText="Contact Name (Optional)"
                            fullWidth={true}
                            name="contactName"
                            onChange={this.handleInputChange}
                            value={lead.contactName}
                        />
                        <SelectField
                            floatingLabelText="Source"
                            fullWidth={true}
                            onChange={(event, key, value) => {
                                this.handleSelectionChange('source', value);
                            }}
                            value={lead.source}
                        >
                            {this.getSelections('sources')}
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
                    </FormColumn>
                    <FormColumn>
                        <SelectField
                            floatingLabelText="Assign To"
                            fullWidth={true}
                            onChange={(event, key, value) => {
                                this.handleSelectionChange('assignTo', value);
                            }}
                            value={lead.assignTo}
                        >
                            {this.getSelections('representatives', true)}
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
                    <TextField
                        floatingLabelText="Description"
                        fullWidth={true}
                        multiLine={true}
                        name="description"
                        onChange={this.handleInputChange}
                        rowsMax={2}
                        style={{ margin: '0 8px 0 8px' }}
                        value={lead.description}
                    />
                </FormColumnsContainer>
                <ButtonContainer>
                    <RaisedButton
                        label="Save"
                        onTouchTap={() => handleSaveTouchTap(lead)}
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
