import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Lead } from 'data/leads';
import { Setting } from 'data/settings';
import { globalStyle } from 'scenes/styles';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropdownInput from 'components/DropdownInput';
import LocationInput from 'components/LocationInput';

const formStyle = globalStyle.twoColumnForm;

const LeadDetailsForm = (
    {
        handleChange,
        handleSubmit,
        sourcesList,
        lead,
    }) => (
        <form onSubmit={handleSubmit}>
            <div style={formStyle.container}>
                <div style={formStyle.leftSide}>
                    <div>
                        <TextField
                            name="leadName"
                            floatingLabelText="Lead Name"
                            style={formStyle.input}
                            value={lead.leadName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <DropdownInput
                            name="source"
                            label="Source"
                            value={lead.source}
                            handleChange={handleChange}
                            selections={sourcesList}
                        />
                    </div>
                    <div>
                        <TextField
                            name="leadFee"
                            floatingLabelText="Lead Fee"
                            style={formStyle.input}
                            value={lead.leadFee === 0 ? '' : lead.leadFee}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div style={formStyle.rightSide}>
                    <div>
                        <LocationInput
                            name="address"
                            label="Address"
                            style={formStyle.input}
                            value={lead.address}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div>
                <FlatButton
                    type="submit"
                    style={globalStyle.flatButton}
                    label="Save"
                />
            </div>
        </form>
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

