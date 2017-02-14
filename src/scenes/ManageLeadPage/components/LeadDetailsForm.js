import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MenuItem from 'material-ui/MenuItem';
import { Lead } from 'data/leads';
import { Setting } from 'data/settings';
import FormGeolocation from 'components/forms/form-geolocation';
import FormColumn from 'components/forms/form-column';
import {
    LeftColumn,
    RightColumn,
    Container,
    LocationInput,
    SelectInput,
    TextInput,
} from 'components/TwoColumnForm';

class LeadDetailsForm extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        sourcesList: PropTypes.array.isRequired,
        lead: ImmutablePropTypes.record,
    };

    static defaultProps = {
        sourcesList: [],
        lead: new Lead(),
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
            handleChange,
            sourcesList,
            lead,
        } = this.props;

        return (
            <form id="lead-details-form">
                <Container>
                    <FormColumn columnIndex={0}>
                        <TextInput
                            name="leadName"
                            floatingLabelText="Lead Name"
                            value={lead.leadName}
                            onChange={handleChange}
                        />
                        <SelectInput
                            name="source"
                            floatingLabelText="Source"
                            value={lead.source}
                            onChange={handleChange}
                        >
                            {sourcesList.map(selection => (
                                <MenuItem
                                    key={selection.id}
                                    value={selection.value}
                                    primaryText={selection.value}
                                />
                            ))}
                        </SelectInput>
                        <TextInput
                            name="leadFee"
                            floatingLabelText="Lead Fee"
                            value={lead.leadFee === 0 ? '' : lead.leadFee}
                            onChange={handleChange}
                        />
                        <TextInput
                            name="phone"
                            floatingLabelText="Phone"
                            value={lead.phone}
                            onChange={handleChange}
                        />
                        <TextInput
                            name="email"
                            floatingLabelText="Email"
                            value={lead.email}
                            onChange={handleChange}
                        />
                    </FormColumn>
                    <FormColumn columnIndex={1}>
                        <FormGeolocation
                            name="address"
                            floatingLabelText="Address"
                            value={lead.address}
                            onChange={handleChange}
                        />
                    </FormColumn>
                </Container>
                <TextInput
                    name="description"
                    floatingLabelText="Description"
                    value={lead.description}
                    onChange={handleChange}
                />
            </form>
        );
    }
}

export default LeadDetailsForm;

