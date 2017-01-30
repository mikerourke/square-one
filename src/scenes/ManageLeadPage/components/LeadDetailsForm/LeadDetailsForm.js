import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Lead } from 'data/leads';
import { Setting } from 'data/settings';
import styles from 'scenes/styles';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropdownInput from 'components/DropdownInput';
import LocationInput from 'components/LocationInput';

const LeadDetailsForm = (
    {
        handleChange,
        handleSubmit,
        sourcesList,
        lead,
    }) => (
        <form onSubmit={handleSubmit}>
            <div style={styles.formContainer}>
                <div style={styles.twoColumnForm.leftSide}>
                    <div>
                        <TextField
                            name="leadName"
                            floatingLabelText="Lead Name"
                            style={styles.input}
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
                            style={styles.input}
                            value={lead.leadFee === 0 ? '' : lead.leadFee}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div style={styles.twoColumnForm.rightSide}>
                    <div>
                        <LocationInput
                            name="address"
                            label="Address"
                            style={styles.input}
                            value={lead.address}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <br />
            <RaisedButton
                type="submit"
                label="Save"
                style={styles.twoColumnForm.firstButton}
            />
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

