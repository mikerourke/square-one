import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Lead } from 'data/leads';
import { Setting } from 'data/settings';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'components/Paper';
import PaperHeader from 'components/PaperHeader';
import {
    Column,
    Container,
    LocationInput,
    SelectInput,
    TextInput,
} from 'components/TwoColumnForm';
import styled from 'styled-components';

const FirstButtonWrapper = styled.div`
    padding: 16px 0 16px 24px;
`;

const LeadDetailsForm = ({
    handleChange,
    handleSubmit,
    sourcesList,
    lead,
}) => (
    <Paper>
        <PaperHeader title="Lead Details" />
        <form onSubmit={handleSubmit}>
            <Container>
                <Column>
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
                </Column>
                <Column>
                    <LocationInput
                        name="address"
                        floatingLabelText="Address"
                        value={lead.address}
                        onChange={handleChange}
                    />
                </Column>
            </Container>
            <TextInput
                name="description"
                floatingLabelText="Description"
                value={lead.description}
                onChange={handleChange}
            />
            <FirstButtonWrapper>
                <RaisedButton
                    primary={true}
                    type="submit"
                    label="Save"
                />
            </FirstButtonWrapper>
        </form>
    </Paper>
);

LeadDetailsForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    sourcesList: PropTypes.array.isRequired,
    lead: ImmutablePropTypes.record,
};

LeadDetailsForm.defaultProps = {
    sourcesList: [],
    lead: new Lead(),
};

export default LeadDetailsForm;

