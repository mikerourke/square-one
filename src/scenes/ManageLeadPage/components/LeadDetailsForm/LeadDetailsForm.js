import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { Lead } from 'data/leads';
import { Setting } from 'data/settings';
import Paper from 'components/Paper';
import PaperHeader from 'components/PaperHeader';
import {
    LeftColumn,
    RightColumn,
    Container,
    LocationInput,
    SelectInput,
    TextInput,
} from 'components/TwoColumnForm';

const FirstButtonWrapper = styled.div`
    padding-top: 16px;
`;

class LeadDetailsForm extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
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
            handleSubmit,
            sourcesList,
            lead,
        } = this.props;

        return (
            <Paper>
                <PaperHeader title="Lead Details" />
                <form onSubmit={handleSubmit}>
                    <Container>
                        <LeftColumn>
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
                        </LeftColumn>
                        <RightColumn>
                            <LocationInput
                                name="address"
                                floatingLabelText="Address"
                                value={lead.address}
                                onChange={handleChange}
                            />
                        </RightColumn>
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
    }
}

export default LeadDetailsForm;

