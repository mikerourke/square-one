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
    handleDeleteTouchTap: (event: Event) => void,
    handleFieldChange: (lead: Lead) => void,
    handleSaveTouchTap: (event: Event, lead: Lead) => void,
    lead: Lead,
    listSettings: Object,
};

type State = {
    lead: Lead,
};

const mapStateToProps = state => ({
    listSettings: selectListSettings(state),
});

const ButtonContainer = styled.div`
    margin-top: 28px;
    margin-left: 8px;
    width: 100%;
`;

/**
 * Form component for entering Lead details.
 * @param {Object} lead Lead entity associated with the form.
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

    constructor(props: Props) {
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
     * Updates the Lead held in local state with the data from the field on the
     *      Details Form component.
     * @param {Event} event Event associated with the input.
     * @param {string|number} newValue New value of the input.
     * @param {string} fieldName Name of the field associated with the input.
     */
    // $FlowFixMe
    handleInputChange = (event: Event & { currentTarget: HTMLInputElement },
        newValue: string | number, fieldName?: string = ''): void => {
        const { handleFieldChange } = this.props;
        let nameOfField;
        if (fieldName) {
            nameOfField = fieldName;
        } else {
            nameOfField = event.currentTarget.name;
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

    getSelections = (settingName: string,
        allowEmpty?: boolean = false): Array<React.Element<*>> => {
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
                                this.handleInputChange(event, value, 'status');
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
                                this.handleInputChange(event, value, 'source');
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
                                this.handleInputChange(
                                    event, value, 'assignTo');
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
                        onTouchTap={event => handleSaveTouchTap(event, lead)}
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
