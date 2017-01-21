import React, { PropTypes } from 'react';
import { getLead } from 'data/leads/actions';
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
        sources,
        lead,
    }) => (
        <form
            style={formStyles.wrapper}
            onSubmit={handleSubmit}>
            <div style={formStyles.leftSide}>
                <div>
                    <TextField
                        name="leadName"
                        floatingLabelText="Lead Name"
                        style={globalStyles.input}
                        value={lead.get('leadName')}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <DropdownInput
                        name="source"
                        label="Source"
                        value={lead.get('source')}
                        handleChange={handleChange}
                        selections={sources}
                    />
                </div>
                <div>
                    <TextField
                        name="leadFee"
                        floatingLabelText="Lead Fee"
                        style={globalStyles.input}
                        value={lead.get('leadFee')}
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
        </form>
);

LeadDetailsForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    sources: PropTypes.array.isRequired,
    lead: PropTypes.object,
};

LeadDetailsForm.defaultProps = {
    lead: {},
};

export default LeadDetailsForm;

