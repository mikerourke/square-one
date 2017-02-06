import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Lead } from 'data/leads';
import { Setting } from 'data/settings';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import LocationInput from 'components/LocationInput';
import PaperHeader from 'components/PaperHeader';
import globalStyles from 'scenes/styles';

const styles = Object.assign({}, globalStyles, {
    formContainer: Object.assign({}, globalStyles.formContainer, {
        marginLeft: globalStyles.spacing.gutterLess,
    }),
});

const LeadDetailsForm = ({
    handleChange,
    handleSubmit,
    sourcesList,
    lead,
}) => (
    <div>
        <Paper style={styles.paper}>
            <PaperHeader title="Lead Details" />
            <form onSubmit={handleSubmit}>
                <div style={styles.formContainer}>
                    <div style={styles.twoColumnForm.leftSide}>
                        <TextField
                            name="leadName"
                            floatingLabelText="Lead Name"
                            style={styles.input}
                            value={lead.leadName}
                            onChange={handleChange}
                        />
                        <SelectField
                            name="source"
                            floatingLabelText="Source"
                            style={styles.input}
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
                        </SelectField>
                        <TextField
                            name="leadFee"
                            floatingLabelText="Lead Fee"
                            style={styles.input}
                            value={lead.leadFee === 0 ? '' : lead.leadFee}
                            onChange={handleChange}
                        />
                        <TextField
                            name="phone"
                            floatingLabelText="Phone"
                            style={styles.input}
                            value={lead.phone}
                            onChange={handleChange}
                        />
                        <TextField
                            name="email"
                            floatingLabelText="Email"
                            style={styles.input}
                            value={lead.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={styles.twoColumnForm.rightSide}>
                        <LocationInput
                            name="address"
                            label="Address"
                            style={styles.input}
                            value={lead.address}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                <TextField
                    name="description"
                    floatingLabelText="Description"
                    style={styles.twoColumnForm.fullWidthInput}
                    value={lead.description}
                    onChange={handleChange}
                />
                <div style={styles.twoColumnForm.firstButton}>
                    <RaisedButton
                        primary={true}
                        type="submit"
                        label="Save"
                    />
                </div>
            </form>
        </Paper>
    </div>
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

