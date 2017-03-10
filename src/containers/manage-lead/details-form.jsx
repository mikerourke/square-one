/* @flow */

// TODO: Add formatting for phone number.

/* External dependencies */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { preventSubmissionOnEnter } from 'lib/form-events';
import Lead from 'state/entities/leads/model';
import FormColumn from 'components/forms/form-column';
import FormColumnsContainer from 'components/forms/form-columns-container';
import FormGeolocation from 'components/forms/form-geolocation';

/* Types */
import type { MapLocation } from 'lib/types';

const mapStateToProps = (state) => {
    const settings = state.getIn(['settings', 'entities']);
    return {
        representativesList: settings.get('representatives').getData(),
        sourcesList: settings.get('sources').getData(),
    };
};

const ButtonContainer = styled.div`
    width: 100%;
`;

/**
 * Form component for entering Lead details.
 * @param {Object} lead Lead entity associated with the form.
 */
class LeadDetailsForm extends React.Component {
    props: {
        handleSaveTouchTap: (event: Event, lead: Lead) => void,
        lead: Lead,
        representativesList: Array<string>,
        sourcesList: Array<string>,
    };

    state: {
        lead: Lead,
    };

    static defaultProps = {
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
     * @param {string} newValue
     * @param {string} fieldName
     */
    handleInputChange = (event: Event, newValue: string,
                         fieldName?: string = ''): void => {
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

    render(): React.Element<*> {
        const {
            handleSaveTouchTap,
            representativesList,
            sourcesList,
        } = this.props;

        const { lead } = this.state;

        return (
            <form id="lead-details-form">
                <FormColumnsContainer>
                    <FormColumn>
                        <TextField
                            floatingLabelText="Lead Name"
                            fullWidth={true}
                            name="leadName"
                            onChange={this.handleInputChange}
                            value={lead.leadName}
                        />
                        <SelectField
                            floatingLabelText="Source"
                            fullWidth={true}
                            onChange={
                                (event: Event, key: string, value: string) => {
                                    this.handleInputChange(event, value,
                                        'source');
                                }}
                            value={lead.source}
                        >
                            {sourcesList.map(selection => (
                                <MenuItem
                                    key={selection}
                                    primaryText={selection}
                                    value={selection}
                                />
                            ))}
                        </SelectField>
                        <TextField
                            floatingLabelText="Lead Fee"
                            fullWidth={true}
                            name="leadFee"
                            onChange={this.handleInputChange}
                            value={lead.leadFee === 0 ? '' : lead.leadFee}
                        />
                        <TextField
                            floatingLabelText="Phone"
                            fullWidth={true}
                            name="phone"
                            onChange={this.handleInputChange}
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
                                    this.handleInputChange(event, value,
                                        'assignTo');
                                }}
                            value={lead.assignTo}
                        >
                            {representativesList.map(selection => (
                                <MenuItem
                                    key={selection}
                                    primaryText={selection}
                                    value={selection}
                                />
                            ))}
                        </SelectField>
                    </FormColumn>
                    <FormColumn>
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
                    <FlatButton
                        label="Save"
                        onTouchTap={(event: Event) =>
                            handleSaveTouchTap(event, lead)}
                    />
                </ButtonContainer>
            </form>
        );
    }
}

export default connect(mapStateToProps)(LeadDetailsForm);
