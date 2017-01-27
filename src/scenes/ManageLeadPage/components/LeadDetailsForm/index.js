import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Lead } from 'data/leads';
import { Setting } from 'data/settings';
import { globalStyles } from 'scenes/styles';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropdownInput from 'components/DropdownInput';
import LocationInput from 'components/LocationInput';

const formStyles = globalStyles.twoColumnForm;

const LeadDetailsForm = (
    {
        handleChange,
        handleSubmit,
        sourcesList,
        lead,
    }) => (
        <form
            style={formStyles.wrapper}
            onSubmit={handleSubmit}
        >
            <div style={formStyles.leftSide}>
                <div>
                    <TextField
                        name="leadName"
                        floatingLabelText="Lead Name"
                        style={globalStyles.input}
                        value={lead && lead.leadName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <DropdownInput
                        name="source"
                        label="Source"
                        value={lead && lead.source}
                        handleChange={handleChange}
                        selections={sourcesList}
                    />
                </div>
                <div>
                    <TextField
                        name="leadFee"
                        floatingLabelText="Lead Fee"
                        style={globalStyles.input}
                        value={lead && lead.leadFee}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <FlatButton
                        type="submit"
                        style={globalStyles.flatButton}
                        label="Save"
                    />
                </div>
            </div>
            <div style={formStyles.rightSide}>
                <div>
                    <LocationInput
                        value={lead.address}
                    />
                </div>
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

