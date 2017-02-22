// @flow

/* External dependencies */
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

/* Internal dependencies */
import { preventSubmissionOnEnter } from 'lib/form-events';
import Lead from 'state/leads/model';
import FormColumn from 'components/forms/form-column';
import FormColumnsContainer from 'components/forms/form-columns-container';
import FormGeolocation from 'components/forms/form-geolocation';

type Props = {
    handleFieldChange: () => void,
    lead: Object,
    representativesList: Array<FilterSelection>,
    sourcesList: Array<FilterSelection>,
};

class LeadDetailsForm extends React.Component<*, Props, *> {
    props: Props;

    static defaultProps = {
        lead: new Lead(),
        sourcesList: [],
        representativesList: [],
    };

    componentDidMount() {
        preventSubmissionOnEnter('geo-address');
    }

    render() {
        const {
            handleFieldChange,
            lead,
            representativesList,
            sourcesList,
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
                            onChange={
                                (event: Event, key: string, value: string) => {
                                    handleFieldChange(event, value, 'source');
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
                            onChange={
                                (event: Event, key: string, value: string) => {
                                    handleFieldChange(event, value, 'assignTo');
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

