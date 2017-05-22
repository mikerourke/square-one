/* @flow */

/* External dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import { Map } from 'immutable';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { errorMessages } from 'lib/form-validation';
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
  fieldErrors: Map<string, string>
};

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
      fieldErrors: new Map(),
    };
  }

  componentDidMount(): void {
    // Ensure the form submission event isn't fired if the user presses
    // "Enter" after changinging the address.
    const leadNameInput = document.getElementById('leadName');
    if (leadNameInput) {
      leadNameInput.focus();
    }
  }

  /**
   * Changes the value of the specified field name to the specified value.
   * @param {string} fieldName Name of the field to update.
   * @param {string|number} newValue Value of the field.
   * @param {string} [errorText=''] Error text associated with the input.
   * @param {Lead} [leadForState] Lead to update in state.  This is optionally
   *    specified due to the Location input having three aspects (latitude,
   *    longitude, and address).
   */
  updateLeadInState = (
    fieldName: string,
    newValue: string | number,
    errorText?: string = '',
    leadForState?: ?Lead,
  ): void => {
    const { handleFieldChange } = this.props;
    const { lead, fieldErrors } = this.state;
    let updatedLead = new Lead();
    if (leadForState) {
      updatedLead = leadForState;
    } else {
      updatedLead = lead.set(fieldName, newValue);
    }
    const updatedFieldErrors = fieldErrors.set(fieldName, errorText);
    this.setState({
      lead: updatedLead,
      fieldErrors: updatedFieldErrors,
    });
    handleFieldChange(updatedLead);
  };

  /**
   * Updates the Lead held in local state with the data from the field on the
   *    Details Form component.
   * @param {Event} event Event associated with the input.
   * @param {string|number} newValue New value of the input.
   * @param {string} [errorText=''] Error text associated with the input.
   */
  handleInputChange = (
    event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement },
    newValue: string | number,
    errorText?: string = '',
  ): void => {
    const fieldName = event.currentTarget.name;
    this.updateLeadInState(fieldName, newValue, errorText);
  };

  /**
   * Update the value of the corresponding Lead field in local state when
   *    the value of a select field is selected.
   * @param {string} fieldName Name of the field associated with the select
   *    field.
   * @param {string} newValue Value of the selected item.
   * @param {boolean} [isRequired=false] Indicates if the field requires a
   *    value.
   */
  handleSelectionChange = (
    fieldName: string,
    newValue: string,
    isRequired?: boolean = false,
  ): void => {
    let errorText = '';
    if (isRequired && newValue === '') {
      errorText = errorMessages.isRequired;
    }
    this.updateLeadInState(fieldName, newValue, errorText);
  };

  /**
   * Updates the address, latitude, and longitude of the Lead held in local
   *    state when the Places Autocomplete input is changed on the
   *    Details Form.
   * @param {MapLocation} newLocation New location to apply to the Lead.
   */
  handleLocationChange = (newLocation: MapLocation): void => {
    const { lead } = this.state;
    const { address, lat, lng } = newLocation;
    let errorText = '';
    if (address === '') {
      errorText = errorMessages.isRequired;
    }
    const updatedLead = lead.merge({ address, lat, lng });
    this.updateLeadInState('address', '', errorText, updatedLead);
  };

  /**
   * Returns a list of MenuItem elements to populate a select field with the
   *    specified name.
   * @param {string} settingName Name of the corresponding setting to get
   *    MenuItems for.
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
    // FUTURE: Add insurance company dropdown.
    const {
      handleDeleteTouchTap,
      handleSaveTouchTap,
    } = this.props;
    const { lead, fieldErrors } = this.state;

    const phoneInputStyle = { flex: '1 0', minWidth: 192 };

    return (
      <form id="lead-details-form">
        <FormColumnsContainer>
          <FormColumn>
            <SelectField
              disabled={(lead.id === 0)}
              errorText={lead.status === '' ? errorMessages.isRequired : ''}
              floatingLabelText="Status"
              fullWidth={true}
              onChange={(event, key, value) => {
                this.handleSelectionChange('status', value, true);
              }}
              value={lead.status}
            >
              {this.getSelections('leadStatuses')}
            </SelectField>
            <FormTextField
              id="leadName"
              dataType="text"
              floatingLabelText="Lead Name"
              fullWidth={true}
              isRequired={true}
              name="leadName"
              onInputUpdate={this.handleInputChange}
              value={lead.leadName}
            />
            <FormTextField
              dataType="text"
              floatingLabelText="Contact Name (Optional)"
              fullWidth={true}
              isRequired={false}
              name="contactName"
              onInputUpdate={this.handleInputChange}
              value={lead.contactName}
            />
            <SelectField
              errorText={lead.source === '' ? errorMessages.isRequired : ''}
              floatingLabelText="Source"
              fullWidth={true}
              name="source"
              onChange={(event, key, value) => {
                this.handleSelectionChange('source', value, true);
              }}
              value={lead.source}
            >
              {this.getSelections('sources')}
            </SelectField>
            <FormTextField
              dataType="number"
              floatingLabelText="Lead Fee (Optional)"
              fullWidth={true}
              isRequired={false}
              name="leadFee"
              onInputUpdate={this.handleInputChange}
              value={lead.leadFee === 0 ? '' : lead.leadFee}
            />
            <glamorous.Div
              alignItems="center"
              display="flex"
              flexFlow="row wrap"
              justifyContent="space-between"
            >
              <FormTextField
                floatingLabelText="Phone"
                format="phone"
                isRequired={true}
                name="phone"
                onInputUpdate={this.handleInputChange}
                style={phoneInputStyle}
                value={lead.phone}
              />
              <glamorous.Div width={8} />
              <FormTextField
                floatingLabelText="Alt. Phone (Optional)"
                format="phone"
                isRequired={false}
                name="altPhone"
                onInputUpdate={this.handleInputChange}
                style={phoneInputStyle}
                value={lead.altPhone}
              />
            </glamorous.Div>
            <FormTextField
              floatingLabelText="Email"
              format="email"
              fullWidth={true}
              isRequired={false}
              name="email"
              onInputUpdate={this.handleInputChange}
              value={lead.email}
            />
          </FormColumn>
          <FormColumn>
            <SelectField
              floatingLabelText="Assign To"
              fullWidth={true}
              name="assignTo"
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
              isRequired={true}
              name="address"
              startingLocation={{
                address: lead.address,
                lat: lead.lat,
                lng: lead.lng,
              }}
            />
          </FormColumn>
          <TextField
            floatingLabelText="Description (Optional)"
            fullWidth={true}
            name="description"
            onChange={this.handleInputChange}
            style={{ margin: '0 8px 0 8px' }}
            value={lead.description}
          />
        </FormColumnsContainer>
        <glamorous.Div
          marginTop={28}
          marginLeft={8}
          width="100%"
        >
          <RaisedButton
            label="Save"
            onTouchTap={() => handleSaveTouchTap(lead, fieldErrors)}
            primary={true}
          />
          <RaisedButton
            label="Delete"
            onTouchTap={handleDeleteTouchTap}
            secondary={true}
            style={{ marginLeft: 16 }}
          />
        </glamorous.Div>
      </form>
    );
  }
}

export default connect(mapStateToProps)(LeadDetailsForm);
